import { Inject, Injectable } from '@nestjs/common';
import { NEW_REPOSITORY } from 'src/core/constants';
import { CompanyEntity } from '../companies/company.entity';
import { NewCreateDto, NewResponseDto, NewUpdateDto } from './news.dto';
import { NewEntity } from './news.entity';
import { NewMapper } from './news.mapper';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEW_REPOSITORY)
    private readonly newRepository: typeof NewEntity
  ) {}

  async create(newToAdd: NewCreateDto): Promise<NewResponseDto> {
    const newCreated = await this.newRepository.create<NewEntity>(newToAdd);
    const newDomain = NewMapper.entityToDomain(newCreated);
    const newResponse = NewMapper.domainToResponse(newDomain);

    return newResponse;
  }

  async findOneById(id: number): Promise<NewResponseDto> {
    const newGet = await this.newRepository.findOne<NewEntity>({
      where: { id },
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const newDomain = NewMapper.entityToDomain(newGet);
    const newResponse = NewMapper.domainToResponse(newDomain);

    return newResponse;
  }

  async findAll(): Promise<NewResponseDto[]> {
    const news = await this.newRepository.findAll({
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const newsDomain = NewMapper.entitiesToDomains(news);
    const newsResponse = NewMapper.domainsToResponses(newsDomain);

    return newsResponse;
  }

  async update(newToUpdate: NewUpdateDto, id: number): Promise<NewResponseDto> {
    await this.newRepository.update(newToUpdate, {
      where: { id },
    });
    const newDomain = NewMapper.updateDtoToDomain(newToUpdate);
    const newResponse = NewMapper.domainToResponse(newDomain);

    return newResponse;
  }
}
