import { Injectable } from '@nestjs/common';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PrismaService } from 'src/services/database/prisma.service';
import { AzureService } from 'src/services/azure/azure.service';
import { Hotel, Prisma, Room } from '@prisma/client';
import { File } from 'buffer';

@Injectable()
export class HotelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly azure: AzureService,
  ) {}
  async create(createHotelDto: Prisma.HotelCreateInput, file: File) {
    const createdData = await this.prisma.hotel.create({
      data: createHotelDto,
    });
    const url = await this.azure.uploadFile(`hotel${createdData.id}`, file);
    const dataWithImgUrl = { ...createdData, image_url: url };
    return this.prisma.hotel.update({
      where: { id: createdData.id },
      data: dataWithImgUrl,
    });
  }

  async findAll() {
    return this.prisma.hotel.findMany();
  }

  private hotelHasAvailability(
    hotels: (Hotel & {
      rooms: Room[];
    })[],
    persons: number,
  ) {
    const hotelsWithAvailability = [];
    for (let hotel of hotels) {
      let count_persons_allowed = 0;
      const allowed_rooms = [];
      for (let room of hotel.rooms) {
        if (count_persons_allowed < persons) {
          console.log(count_persons_allowed);
          
          count_persons_allowed += parseInt(room.max_occupancy);
          allowed_rooms.push(room);
        }
      }
      hotel.rooms=allowed_rooms;
      if (count_persons_allowed >= persons) hotelsWithAvailability.push(hotel);
    }
    return hotelsWithAvailability;
  }

  async findAvailable(
    location: string,
    dateFrom: string,
    dateTo: string,
    persons: number,
  ) {
    const hotels = await this.prisma.hotel.findMany({
      where: {
        OR: [
          {
            city: {
              contains: location,
              mode: 'insensitive',
            },
          },
          {
            department: {
              contains: location,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: { rooms: {orderBy:{max_occupancy:"asc"}} },
    });
    //  const hotelsraw= await this.prisma.$queryRaw`SELECT * FROM "Hotel" WHERE LOWER(city) LIKE '%${location.toLocaleLowerCase()}%'`

    const finalRoom = this.hotelHasAvailability(hotels, persons);
    let hotelsFinal = '';
    return finalRoom;
  }
  async recommended() {
    const hotels = await this.prisma.hotel.findMany({
      where: { state: { equals: 'enabled' } },
      include: { rooms: true },
    });
    return hotels;
  }

  findOne(id: number) {
    return this.prisma.hotel.findUnique({ where: { id: id } });
  }

  async update(id: number, updateHotelDto: UpdateHotelDto, file: File) {
    if (file) await this.azure.uploadFile(`hotel${id}`, file);
    return this.prisma.hotel.update({
      where: { id },
      data: updateHotelDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
