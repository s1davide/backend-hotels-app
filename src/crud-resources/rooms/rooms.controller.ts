import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRoomDto: Prisma.RoomCreateInput & { hotel_id: string },
    @UploadedFile() file,
  ) {
    return this.roomsService.create({ ...createRoomDto, image_url: '' }, file);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }
  @Get("/available")
  findAvailable(){    
    return this.roomsService.findAvailable();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto& { hotel_id: string,id:string,file:string },
  @UploadedFile() file) {
    return this.roomsService.update(+id, updateRoomDto,file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
