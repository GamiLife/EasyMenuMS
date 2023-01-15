import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { MetaDomain } from 'src/core/domain';
import { DBError, EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { BaseService } from 'src/core/services';
import { CompanyEntity } from '../companies/company.entity';
import { CompaniesService } from '../companies/company.service';
import { CategoryDomainV2 } from './categories.domain';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  GetCategoriesByCompany,
} from './categories.dto';
import { CategoryEntity } from './categories.entity';

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof CategoryEntity,
    private readonly companyService: CompaniesService
  ) {
    super(categoryRepository);
  }

  async create(
    category: CategoryCreateDto,
    fileResult: string
  ): Promise<CategoryDomainV2> {
    await this.companyService.findOneById(category.companyId);

    const rowToCreate = {
      ...category,
      imageCategory: fileResult,
    };

    const categoryEntity = await this.categoryRepository
      .create<CategoryEntity>(rowToCreate)
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

  async findAllByCompanyId(
    companyId: number,
    pagination: GetCategoriesByCompany
  ): Promise<MetaDomain<CategoryDomainV2[]>> {
    await this.companyService.findOneById(companyId);

    const filtersRepo = [
      {
        model: CompanyEntity,
        attributes: ['id'],
        required: true,
        where: {
          id: companyId,
        },
      },
    ];

    const categoriesCounter = await this.count({
      filtersRepo,
      searchCol: 'title',
      search: pagination.search,
    });

    const categoriesEntity = await this.pagination<CategoryEntity[]>({
      filtersRepo,
      pagination,
      searchCol: 'title',
    });

    const categoriesDomain = categoriesEntity.map((categoryEntity) =>
      plainToClass(CategoryDomainV2, categoryEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<CategoryDomainV2[]>({
      pagination,
      totalItems: categoriesCounter,
      data: categoriesDomain,
    });

    return metaResponse;
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
    id: number,
    fileResult: string
  ): Promise<CategoryDomainV2> {
    await this.companyService.findOneById(category.companyId);

    const rowToUpdate = {
      ...category,
      imageCategory: fileResult,
    };

    await this.categoryRepository
      .update(rowToUpdate, {
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
