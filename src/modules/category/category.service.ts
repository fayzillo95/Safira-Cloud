import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    let created_category = await this.prismaService.category.create({ data: createCategoryDto })
    if (!created_category) throw new BadRequestException('Error Detected On Category,  Creating Time')

    return { success: true, message: 'Successfully Created Category', data: created_category }
  }

  async findAll() {
    let all_categories = await this.prismaService.category.findMany(
      {
        include: { services: true }
      }
    )
    return { success: true, message: 'Successfully Get All Categories with Services', data: all_categories }
  }

  async findOne(id: number) {
    let found_category = await this.prismaService.category.findFirst(
      {
        where: { id: id }
      }
    )
    if (!found_category) throw new NotFoundException(`This ${id} Is Not Found!`)

    return { success: true, message: 'Successfully Getted One Category', data: found_category }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let findAndUpdate = await this.prismaService.category.update(
      {
        where: { id: id }, data: updateCategoryDto
      }
    )
    if (!findAndUpdate) throw new NotFoundException(`This ${id} Is Not Found`)

    return { success: true, message: `Successfully Updated ${id} Category`, data: findAndUpdate }
  }

  async remove(id: number) {
    let deleted = await this.prismaService.category.delete(
      {
        where: { id: id }
      }
    )
    if (!deleted) throw new NotFoundException(`This ${id} Is Not Found`)

    return {success: true, message: `Successfully Deleted ${id} Category`, data: deleted.name}
    
  }
}
