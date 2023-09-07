import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyDTO } from './dto/company.dto';
import { CompanyService } from './company.service';

@ApiTags('company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCompany(@Param('id') id: string, @Body() companyDto: CompanyDTO) {
    return this.companyService.update(id, companyDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCompany(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }
}
