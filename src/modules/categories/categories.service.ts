import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { CompanyEntity } from '../companies/company.entity';
import {
  CategoryCreateDto,
  CategoryResponseDto,
  CategoryUpdateDto,
} from './categories.dto';
import { CategoryEntity } from './categories.entity';
import { CategoryMapper } from './categories.mapper';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof CategoryEntity
  ) {}

  async create(category: CategoryCreateDto): Promise<CategoryResponseDto> {
    const categoryCreated =
      await this.categoryRepository.create<CategoryEntity>(category);
    const categoryDomain = CategoryMapper.entityToDomain(categoryCreated);
    const categoryResponse = CategoryMapper.domainToResponse(categoryDomain);

    return categoryResponse;
  }

  async findOneById(id: number): Promise<CategoryResponseDto> {
    const categoryGet = await this.categoryRepository.findOne<CategoryEntity>({
      where: { id },
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const categoryDomain = CategoryMapper.entityToDomain(categoryGet);
    const categoryResponse = CategoryMapper.domainToResponse(categoryDomain);

    return categoryResponse;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.findAll({
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });
    const categoriesDomain = CategoryMapper.entitiesToDomains(categories);
    const categoriesResponse =
      CategoryMapper.domainsToResponses(categoriesDomain);

    return categoriesResponse;
  }

  async update(
    categoryToUpdate: CategoryUpdateDto,
    id: number
  ): Promise<CategoryResponseDto> {
    await this.categoryRepository.update(categoryToUpdate, {
      where: { id },
    });
    const categoryDomain = CategoryMapper.updateDtoToDomain(categoryToUpdate);
    const categoryResponse = CategoryMapper.domainToResponse(categoryDomain);

    return categoryResponse;
  }
}
