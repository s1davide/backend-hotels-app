import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

export type InformationReservation={
  personsData: {
    name: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    documentType: string,
    noDocument: string,
    email:string,
    phone: string
  },
  emergencyContact: { name: string, lastName: string, phone: string},
  rooms:string,
  persons:string,
  days:string,
  idHotel:string,
  cost: string,
  dateFrom: string,
  dateTo: string
}
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: InformationReservation) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
