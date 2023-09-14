import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { COMPANY_REPOSITORY } from 'src/database/constants';
import { Company } from 'src/database/entities';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: typeof Company,
  ) {}

  async create(name: string, nit: string): Promise<Company> {
    return await this.companyRepository.create({ name, nit });
  }

  async findOne(filter_: string): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: {
        [Op.or]: [{ nit: filter_ }, { id: filter_ }],
      },
    });
  }

  async update(
    id: string,
    args: {
      name?: string;
      nit?: string;
      logo?: string;
    },
  ): Promise<Company | null> {
    await this.companyRepository.update(args, {
      where: {
        id,
      },
    });
    return this.companyRepository.findOne({ where: { id } });
  }
}
