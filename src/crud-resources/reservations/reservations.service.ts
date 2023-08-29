import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AzureService } from 'src/services/azure/azure.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { HotelsService } from '../hotels/hotels.service';
import { InformationReservation } from './reservations.controller';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly azureService: AzureService,
    private readonly hotelsService: HotelsService,
  ) {}
  async create(createReservationDto: InformationReservation) {
    // console.log(createReservationDto,"here");
    const { idHotel, personsData,dateFrom,dateTo,days, cost } = createReservationDto;
    const hotel = await this.hotelsService.findOne(parseInt(idHotel));
    const costFormatted=parseInt(cost).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  })

    const path = join(__dirname, '../../../../src/', 'static/mail-templates/');
    const templatePath = join(path, 'index.html');
    const file = readFileSync(templatePath, 'utf8')
      .replace(
        '${nombre-persona}',
        `${personsData.name} ${personsData.lastName}`,
      )
      .replace('${hotel-name}', hotel.name)
      .replace('${city-name}', hotel.city)
      .replace('${rooms}', createReservationDto.rooms)
      .replace('${persons}', createReservationDto.persons)
      .replace('${book-cost}', costFormatted)
      .replace('${dateinout}', `${dateFrom} - ${dateTo} (${days} días)`);

     this.azureService.sendEmail({senderAddress:"DoNotReply@cdd6be92-d3ea-4993-97fe-9a7e12cb84a3.azurecomm.net",content:{subject:"Reservación creada desde Hotels App",html:file}
    ,recipients:{
      to:[
        {address:personsData.email, displayName:`${personsData.name} ${personsData.lastName}`}
      ]    }})
    return [];
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
