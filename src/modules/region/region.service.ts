import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}
  
  
  async findAll() {
    return this.prisma.region.findMany();
  }
  
  
  async findOne(id: number) {
    return this.prisma.region.findUnique({ where: { id } });
  }


  async create(payload: CreateRegionDto) {
    if(await this.prisma.region.findUnique({where: {name: payload.name}})) {
      throw new ConflictException({success: false, message: 'Region alredy exists !'})
    }
    await this.prisma.region.create({ data: payload })
    return { success: true, message: 'Region succes created !' }
  }


  async update(id: number, payload: UpdateRegionDto) {
    if (!await this.prisma.region.findUnique({ where: { id } })) {
      throw new NotFoundException({ success: false, message: 'Region not found !' })
    }
    if(await this.prisma.region.findUnique({where: {name: payload.name}})) {
      throw new ConflictException({success: false, message: 'Region alredy exists !'})
    }
    await this.prisma.region.update({ where: { id }, data: payload, })
    return { success: true, message: 'Region succes created !' }
  }


  async remove(id: number) {
    if (!await this.prisma.region.findUnique({ where: { id } })) {
      throw new NotFoundException({ success: false, message: 'Region not found !' })
    }
    return this.prisma.region.delete({ where: { id } });
  }
}
