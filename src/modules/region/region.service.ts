import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RegionService {
  create(createRegionDto: CreateRegionDto) {
    return 'This action adds a new region';
  }

  findAll() {
    return `This action returns all region`;
  }
  
  
  async create(payload: CreateRegionDto) {
    await this.prisma.region.create({ data: payload })
    return {success: true, message: 'Region succes created !'}
  }

  
  async update(id: number, payload: UpdateRegionDto) {
    if(!await this.prisma.region.findUnique({where: {id}})) {
      throw new NotFoundException({success: false, message: 'Region not found !'})
    }
    await this.prisma.region.update({ where: { id }, data: payload, })
    return {success: true, message: 'Region succes created !'}
  }


  async remove(id: number) {
    if(!await this.prisma.region.findUnique({where: {id}})) {
      throw new NotFoundException({success: false, message: 'Region not found !'})
    }
    return this.prisma.region.delete({ where: { id } });
  }
}

