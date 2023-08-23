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
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createHotelDto: Prisma.HotelCreateInput,
    @UploadedFile() file,
  ) {
    return this.hotelsService.create(
      { ...createHotelDto, image_url: '' },
      file,
    );
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }
  @Get('available')
  findAvailable(
    @Query('location') location: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('persons') persons: number,
  ) {
    console.log("available");
    
    return this.hotelsService.findAvailable(
      location,
      dateFrom,
      dateTo,
      persons,
    );
  }
  @Get('recommended')
  recommended() {
    return this.hotelsService.recommended();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
    @UploadedFile() file,
  ) {
    delete (updateHotelDto as any).file;
    delete (updateHotelDto as any).id;
    return this.hotelsService.update(+id, updateHotelDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
