import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { FARMS } from 'src/auth/constants';
import { FARM_REPOSITORY } from 'src/database/constants';
import { Device, Farm, User } from 'src/database/entities';

@Injectable()
export class FarmService {
  constructor(
    @Inject(FARM_REPOSITORY)
    private farmRepository: typeof Farm,
  ) {}

  async create(
    args: {
      name: string;
      description: string;
      start_crop_dt: string;
      end_crop_dt: string;
    },
    tokenDecode?: any,
  ): Promise<Farm> {
    return await this.farmRepository.create({
      name: args.name,
      description: args.description,
      start_crop_dt: args.start_crop_dt,
      end_crop_dt: args.end_crop_dt,
      companyId: tokenDecode.companyId,
    });
  }

  async findOne(search: string): Promise<Farm | null> {
    return this.farmRepository.findOne({
      where: { [Op.or]: [{ name: search }, { id: search }] },
      include: [Device, { model: User, as: 'users' }],
    });
  }

  async findAll(tokenDecode?: any, search?: string): Promise<Farm[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter: { companyId: string; end_crop_dt?: any } = {
      companyId: companyId,
    };
    if (search && search === FARMS.ACTIVE) {
      console.log('No entro al active');
      builtFilter.end_crop_dt = { [Op.gt]: Date.now() };
    }
    if (search && search === FARMS.INACTIVE) {
      builtFilter.end_crop_dt = { [Op.lt]: Date.now() };
    }

    return this.farmRepository.findAll({
      where: builtFilter,
      order: [['end_crop_dt', 'DESC']],
      include: Device,
    });
  }

  async findAllForAsigned(
    userId: string,
    tokenDecode?: any,
  ): Promise<any[] | null> {
    const companyId = tokenDecode.companyId;
    return this.farmRepository.findAll({
      where: {
        companyId,
      },
      order: [['end_crop_dt', 'DESC']],
      include: [
        {
          model: User,
          as: 'users',
          where: { id: { [Op.ne]: userId } },
          through: { attributes: [] },
        },
      ],
    });
  }

  async update(
    id: string,
    args: {
      name?: string;
      description?: string;
      start_crop_dt?: string;
      end_crop_dt?: string;
    },
  ): Promise<Farm | null> {
    await this.farmRepository.update(args, {
      where: {
        id,
      },
    });
    return this.farmRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.farmRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
