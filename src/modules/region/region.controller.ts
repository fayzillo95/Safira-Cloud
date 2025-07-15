import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha regionlarni olish' })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID boyicha regionni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Yangi region yaratish', description: 'minimal 3-ta belgidan iborat bolgan region nomini kiritish kk !' })
  create(@Body() payload: CreateRegionDto) {
    return this.regionService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Regionni yangilash', description: 'minimal 3-ta belgidan iborat bolgan region nomini kiritish kk !' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRegionDto,
  ) {
    return this.regionService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Regionni ochirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.remove(id);
  }
}