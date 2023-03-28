import { Injectable } from '@nestjs/common';
import { MetaDomain } from 'src/core/domain';
import { MetaFactory } from 'src/core/factories';
import { DishRepository } from '../infraestructure/db/dish.repository';
import { DishMapper } from '../infraestructure/mapper/dish.mapper';
import {
  CreateDishRequestDTO,
  CreateDishResponseDTO,
} from './dtos/create-dish.dto';
import {
  GetDishCollectionRequestDTO,
  GetDishCollectionResponseDTO,
} from './dtos/get-collection.dto';
import { GetDishRequestDTO, GetDishResponseDTO } from './dtos/get-dish.dto';
import {
  GetShortInfoRequestDTO,
  GetShortInfoResponseDTO,
} from './dtos/get-short-dish-info.dto';
import {
  UpdateDishRequestDTO,
  UpdateDishResponseDTO,
} from './dtos/update-dish.dto';

interface IDishService {
  getShortDishInfoById: (
    req: GetShortInfoRequestDTO,
    id: number
  ) => Promise<GetShortInfoResponseDTO>;
  getDishById: (
    req: GetDishRequestDTO,
    id: number
  ) => Promise<GetDishResponseDTO>;
  getDishBySlug: (
    req: GetDishRequestDTO,
    slug: string
  ) => Promise<GetDishResponseDTO>;
  geDishCollection: (
    req: GetDishCollectionRequestDTO
  ) => Promise<MetaDomain<GetDishCollectionResponseDTO[]>>;
  create: (req: CreateDishRequestDTO) => Promise<CreateDishResponseDTO>;
  update: (
    req: UpdateDishRequestDTO,
    id: number
  ) => Promise<UpdateDishResponseDTO>;
}

@Injectable()
export class DishService implements IDishService {
  constructor(private dishRepository: DishRepository) {}

  async getShortDishInfoById(req: GetShortInfoRequestDTO, id: number) {
    const { companyId } = req;

    const dish = await this.dishRepository.getShortDishInfoById(id, companyId);
    const res = DishMapper.toGetShortInfoResponseDto(dish);

    return res;
  }

  async getDishById(req: GetDishRequestDTO, id: number) {
    const { companyId } = req;

    const dish = await this.dishRepository.getDishById(id, companyId);
    const res = DishMapper.toGetDishResponseDto(dish);

    return res;
  }

  async getDishBySlug(req: GetDishRequestDTO, slug: string) {
    const { companyId } = req;

    const dish = await this.dishRepository.getDishBySlug(slug, companyId);
    const res = DishMapper.toGetDishResponseDto(dish);

    return res;
  }

  async geDishCollection(req: GetDishCollectionRequestDTO) {
    const { categoryId, companyId, ...pagination } = req;
    const where = { categoryId, companyId };
    const counter = await this.dishRepository.count(
      pagination.searchBy,
      pagination.searchOp,
      {
        categoryId,
        companyId,
      }
    );

    const dishCollection = await this.dishRepository.geDishCollection(
      pagination,
      where
    );

    const data = DishMapper.toGetDishCollectionResponseDto(dishCollection);
    const metaResponse = MetaFactory.create<any[]>({
      pagination,
      totalItems: counter,
      data,
    });
    return metaResponse;
  }

  //TODO: Better way to validate unique dish name
  async create(req: CreateDishRequestDTO) {
    const dish = DishMapper.toDomainFromCreateDishRequestDto(req);
    const creation = await this.dishRepository.save(dish);
    const res = DishMapper.toCreateDishResponseDto(creation);
    return res;
  }

  async update(req: UpdateDishRequestDTO, id: number) {
    const dish = DishMapper.toDomainFromUpdateDishRequestDto(req, id);
    const upsert = await this.dishRepository.save(dish);
    const res = DishMapper.toUpdateDishResponseDto(upsert);
    return res;
  }
}
