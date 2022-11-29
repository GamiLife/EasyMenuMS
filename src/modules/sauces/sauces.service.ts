import { Inject, Injectable } from '@nestjs/common';
import { SAUCE_REPOSITORY } from 'src/core/constants';
import { CompanyEntity } from '../companies/company.entity';
import { SauceCreateDto, SauceResponseDto, SauceUpdateDto } from './sauces.dto';
import { SauceEntity } from './sauces.entity';
import { SauceMapper } from './sauces.mapper';

@Injectable()
export class SaucesService {
  constructor(
    @Inject(SAUCE_REPOSITORY)
    private readonly sauceRepository: typeof SauceEntity
  ) {}

  async create(sauce: SauceCreateDto): Promise<SauceResponseDto> {
    const sauceCreated = await this.sauceRepository.create<SauceEntity>(sauce);
    const sauceDomain = SauceMapper.entityToDomain(sauceCreated);
    const sauceResponse = SauceMapper.domainToResponse(sauceDomain);

    return sauceResponse;
  }

  async findOneById(id: number): Promise<SauceResponseDto> {
    const sauceGet = await this.sauceRepository.findOne<SauceEntity>({
      where: { id },
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const sauceDomain = SauceMapper.entityToDomain(sauceGet);
    const sauceResponse = SauceMapper.domainToResponse(sauceDomain);

    return sauceResponse;
  }

  async findAll(): Promise<SauceResponseDto[]> {
    const sauces = await this.sauceRepository.findAll({
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const saucesDomain = SauceMapper.entitiesToDomains(sauces);
    const saucesResponse = SauceMapper.domainsToResponses(saucesDomain);

    return saucesResponse;
  }

  async update(
    sauceToUpdate: SauceUpdateDto,
    id: number
  ): Promise<SauceResponseDto> {
    await this.sauceRepository.update(sauceToUpdate, {
      where: { id },
    });
    const sauceDomain = SauceMapper.updateDtoToDomain(sauceToUpdate);
    const sauceResponse = SauceMapper.domainToResponse(sauceDomain);

    return sauceResponse;
  }
}
