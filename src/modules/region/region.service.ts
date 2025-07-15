<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
=======
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
>>>>>>> 8df8998 (servicedagi hatolik tog'rilandi)
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RegionService {
<<<<<<< HEAD
  create(createRegionDto: CreateRegionDto) {
    return 'This action adds a new region';
  }

  findAll() {
    return `This action returns all region`;
=======
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
    return {success: true, message: 'Region succes created !'}
  }

  
  async update(id: number, payload: UpdateRegionDto) {
    if(!await this.prisma.region.findUnique({where: {id}})) {
      throw new NotFoundException({success: false, message: 'Region not found !'})
    }
    if(await this.prisma.region.findUnique({where: {name: payload.name}})) {
      throw new ConflictException({success: false, message: 'Region alredy exists !'})
    }
    await this.prisma.region.update({ where: { id }, data: payload, })
    return {success: true, message: 'Region succes created !'}
>>>>>>> 8df8998 (servicedagi hatolik tog'rilandi)
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}

