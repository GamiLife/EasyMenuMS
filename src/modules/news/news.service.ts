import { plainToClass } from "@nestjs/class-transformer";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { NEW_REPOSITORY } from "src/core/constants";
import { MetaDomain } from "src/core/domain";
import { DBError } from "src/core/exceptions";
import { MetaFactory } from "src/core/factories";
import { BaseService } from "src/core/services";
import { GetCategoriesByCompany } from "../categories/categories.dto";
import { CompanyEntity } from "../companies/company.entity";
import { CompaniesService } from "../companies/company.service";
import { NewDomainV2 } from "./news.domain";
import { NewCreateDto, NewUpdateDto } from "./news.dto";
import { NewEntity } from "./news.entity";

@Injectable()
export class NewsService extends BaseService {
  constructor(
    @Inject(NEW_REPOSITORY)
    private readonly newRepository: typeof NewEntity,
    private readonly companyService: CompaniesService
  ) {
    super(newRepository);
  }

  async create(newToAdd: NewCreateDto, fileUrl: string): Promise<NewDomainV2> {
    await this.companyService.findOneById(newToAdd.companyId);

    const entityToCreate = { ...newToAdd, imageUrl: fileUrl };

    const newEntity = await this.newRepository.create<NewEntity>(
      entityToCreate
    );

    if (!newEntity) {
      throw new DBError("New query failed", HttpStatus.BAD_REQUEST);
    }

    const newDomain = plainToClass(NewDomainV2, newEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return newDomain;
  }

  async findOneById(id: number): Promise<NewDomainV2> {
    const newGetEntity = await this.newRepository.findOne<NewEntity>({
      where: { id },
      include: [
        {
          model: CompanyEntity,
        },
      ],
    });

    if (!newGetEntity) {
      throw new DBError("New not found", HttpStatus.NOT_FOUND);
    }

    const newDomain = plainToClass(NewDomainV2, newGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return newDomain;
  }

  async findAll(): Promise<NewDomainV2[]> {
    const newsEntity = await this.newRepository.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "imageUrl",
        "backgroundColor",
        "startDate",
        "endDate",
      ],
      include: [
        {
          model: CompanyEntity,
          attributes: ["id"],
          required: true,
        },
      ],
    });

    const newsDomain = newsEntity.map((newEntity) =>
      plainToClass(NewDomainV2, newEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return newsDomain;
  }

  async findAllByCompanyId(
    companyId: number,
    pagination: GetCategoriesByCompany
  ): Promise<MetaDomain<NewDomainV2[]>> {
    await this.companyService.findOneById(companyId);

    const filtersRepo = [
      {
        model: CompanyEntity,
        attributes: ["id"],
        required: true,
        where: {
          id: companyId,
        },
      },
    ];

    const where = pagination.byDate
      ? {
          startDate: {
            [Op.and]: {
              [Op.gte]: pagination.byDate,
            },
          },
        }
      : {};

    const newCounter = await this.count({
      filtersRepo,
      searchCol: "title",
      where,
      search: pagination.search,
    });

    const newsEntity = await this.pagination<NewEntity[]>({
      attributes: [
        "id",
        "title",
        "description",
        "imageUrl",
        "backgroundColor",
        "startDate",
        "endDate",
      ],
      filtersRepo,
      pagination,
      searchCol: "title",
      where,
    });

    const newsDomain = newsEntity.map((newEntity) =>
      plainToClass(NewDomainV2, newEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<NewDomainV2[]>({
      pagination,
      totalItems: newCounter,
      data: newsDomain,
    });

    return metaResponse;
  }

  async update(
    newToUpdate: NewUpdateDto,
    id: number,
    fileUrl: string
  ): Promise<NewDomainV2> {
    await this.companyService.findOneById(newToUpdate.companyId);

    const entityToUpdate = { ...newToUpdate, imageUrl: fileUrl };

    await this.newRepository
      .update(entityToUpdate, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `New query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const categoryDomain = plainToClass(NewDomainV2, newToUpdate, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return categoryDomain;
  }
}
