import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateCompanyDTO } from './dto/company.dto';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destination, renameImage } from 'src/helpers/images/images.helpers';
import * as fs from 'fs';
import { Roles } from 'src/auth/decorators/roles';

@ApiTags('company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Roles('ADMIN')
  @Post(':companyId')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: destination,
        filename: renameImage,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateCompanyDTO,
  })
  @HttpCode(HttpStatus.OK)
  async updateCompany(
    @Body() companyDto: UpdateCompanyDTO,
    @UploadedFile() logo: Express.Multer.File,
    @Param('companyId') companyId: string,
  ) {
    const validFields: Partial<UpdateCompanyDTO> = {};
    if (companyDto.name) validFields.name = companyDto.name;
    if (companyDto.nit) validFields.nit = companyDto.nit;
    const company = await this.companyService.findOne(companyId);
    const tempLogoPath = logo ? logo.path : null;
    if (tempLogoPath) {
      const finalImagePath = `images/company/${companyId}`;
      if (!fs.existsSync(finalImagePath)) {
        fs.mkdirSync(finalImagePath, { recursive: true });
      }
      if (company?.logo && fs.existsSync(company.logo)) {
        fs.unlink(company.logo ?? '', (error) => {
          if (error) {
            throw new BadRequestException(`Error al borrar ${company?.logo}:`);
          }
        });
      }
      fs.renameSync(tempLogoPath, `${finalImagePath}/${logo.originalname}`);
      validFields.logo = `${finalImagePath}/${logo.originalname}`;
    }
    return this.companyService.update(validFields, companyId);
  }

  @Get(':companyId')
  @HttpCode(HttpStatus.OK)
  getCompany(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }
}
