import { Injectable } from '@nestjs/common';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { PrismaService } from 'src/services/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReferencesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReferenceDto: Prisma.ReferencesCreateInput) {
    return this.prisma.references.create({ data: createReferenceDto });
  }

  findAll(search_by: string | number, value: string) {
    if (search_by && value) {
      return this.prisma.references.findMany({
        where: {
          [search_by]: value,
        },
      });
    }
    return this.prisma.references.findMany();
  }

  findOne(id: number) {
    return this.prisma.references.findUnique({ where: { id: id } });
  }

  update(id: number, updateReferenceDto: UpdateReferenceDto) {
    return this.prisma.references.update({
      where: { id },
      data: updateReferenceDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} reference`;
  }
}
