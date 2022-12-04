import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { CategoryDomainV2 } from './categories.domain';
import { CategoryCreateDto, CategoryUpdateDto } from './categories.dto';
import { CategoryEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof CategoryEntity,
    private readonly companyService: CompaniesService
  ) {}

  async create(category: CategoryCreateDto): Promise<CategoryDomainV2> {
    await this.companyService.findOneById(category.companyId);

    const categoryEntity = await this.categoryRepository
      .create<CategoryEntity>(category)
      .catch((reason) => {
        throw new DBError(
          `Category query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!categoryEntity) {
      throw new DBError('Category query failed', HttpStatus.BAD_REQUEST);
    }

    const categoryDomain = plainToClass(CategoryDomainV2, categoryEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }

  async findOneById(id: number): Promise<CategoryDomainV2> {
    const categoryGetEntity =
      await this.categoryRepository.findOne<CategoryEntity>({
        where: { id },
        include: [
          {
            model: CompanyEntity,
          },
        ],
      });

    if (!categoryGetEntity) {
      throw new EmptyError('Category not found', HttpStatus.NOT_FOUND);
    }

    const categoryDomain = plainToClass(CategoryDomainV2, categoryGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }

  async findAll(): Promise<CategoryDomainV2[]> {
    const categoriesEntity = await this.categoryRepository.findAll({
      include: [
        {
          model: CompanyEntity,
          attributes: ['id'],
          required: true,
        },
      ],
    });

    const categoriesDomain = categoriesEntity.map((categoryEntity) =>
      plainToClass(CategoryDomainV2, categoryEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return categoriesDomain;
  }

  async update(
    category: CategoryUpdateDto,
    id: number
  ): Promise<CategoryDomainV2> {
    await this.companyService.findOneById(category.companyId);

    await this.categoryRepository
      .update(category, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `Category query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const categoryDomain = plainToClass(CategoryDomainV2, category, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }
}
