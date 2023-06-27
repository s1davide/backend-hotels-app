import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/services/database/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}
  create(createContactDto: CreateContactDto) {
    return this.prisma.contacts.create({ data: createContactDto });
  }

  findAll() {
    return this.prisma.contacts.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.prisma.contacts.update({
      where: { mail: id },
      data: updateContactDto,
    });
  }

  remove(id: string) {
    return this.prisma.contacts.delete({where:{
      mail:id
    }});
  }  
}
