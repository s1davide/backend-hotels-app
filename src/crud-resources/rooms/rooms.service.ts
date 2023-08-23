import { Injectable } from '@nestjs/common';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/services/database/prisma.service';
import { AzureService } from 'src/services/azure/azure.service';
import { Prisma } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { log } from 'console';

@Injectable()
export class RoomsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly azure: AzureService,
  ) {}
  async create(
    createRoomDto: Prisma.RoomCreateInput & { hotel_id: string },
    file: File,
  ) {
    const hotel_id = parseInt(createRoomDto.hotel_id);
    delete createRoomDto.hotel_id;
    const createdData = await this.prisma.room.create({
      data: {
        ...(createRoomDto as Prisma.RoomCreateInput),
        hotel: { connect: { id: hotel_id } },
      },
    });
    const url = await this.azure.uploadFile(`room${createdData.id}`, file);
    const dataWithImgUrl = { ...createdData, image_url: url };
    return this.prisma.room.update({
      where: { id: createdData.id },
      data: dataWithImgUrl,
    });
  }

  async findAll() {
    const room = await this.prisma.room.findMany({ include: { hotel: true } });
    const roomWithotelName = room.map((room) => ({
      ...room,
      hotel: room.hotel.name,
    }));
    return roomWithotelName;
  }
  async findAvailable() {
    const room = await this.prisma.room.findMany({ include: { hotel: true } });
    return room;
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({ where: { id: id } });
  }

  async update(
    id: number,
    updateRoomDto: UpdateRoomDto & {
      hotel_id: string;
      id: string;
      file: string;
    },
    file: File,
  ) {
    const { hotel_id, ...roomData } = updateRoomDto;
    if (file) await this.azure.uploadFile(`hotel${id}`, file);
    delete roomData.id;
    delete roomData.file;

    return this.prisma.room.update({
      where: { id: id },
      data: {
        ...(roomData as Prisma.RoomUpdateInput),
        hotel: {
          connect: { id: parseInt(hotel_id) },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
