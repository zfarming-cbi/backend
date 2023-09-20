import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyDTO } from './dto/company.dto';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destination, renameImage } from 'src/helpers/images/images.helpers';
import { JwtService } from '@nestjs/jwt';

@ApiTags('company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private jwtService: JwtService,
  ) {}

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: destination,
        filename: renameImage,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CompanyDTO,
  })
  @HttpCode(HttpStatus.OK)
  updateCompany(
    @Param('id') id: string,
    @Body() companyDto: CompanyDTO,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    companyDto.logo = logo.path;
    return this.companyService.update(id, companyDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getCompany(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.companyService.findOne(decodeToken);
  }
}
