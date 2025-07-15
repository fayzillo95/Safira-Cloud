import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 400, description: 'UnSuccessfully' })
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'All categories' })
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get a single category by Id' })
  @ApiResponse({ status: 200, description: 'Category found successfully' })
  @ApiResponse({ status: 404, description: 'UnSuccessfully' })
  @Get(':id/one')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a category by Id' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'UnSuccessfully' })
  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'UnSuccessfully' })
  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
