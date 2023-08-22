import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/database/constants';
import { Company } from 'src/database/entities';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: typeof Company,
  ) {}

  async create(name: string): Promise<Company> {
    return await this.companyRepository.create({ name });
  }
}
