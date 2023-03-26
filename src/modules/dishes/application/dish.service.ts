import { Injectable } from '@nestjs/common';
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
  UpdateDishRequestDTO,
  UpdateDishResponseDTO,
} from './dtos/update-dish.dto';

interface IDishService {
  getDish: (
    req: GetDishRequestDTO,
    dishId: number
  ) => Promise<GetDishResponseDTO>;
  geDishCollection: (
    req: GetDishCollectionRequestDTO,
    dishId: number
  ) => Promise<GetDishCollectionResponseDTO[]>;
  create: (req: CreateDishRequestDTO) => Promise<CreateDishResponseDTO>;
  update: (
    req: UpdateDishRequestDTO,
    id: number
  ) => Promise<UpdateDishResponseDTO>;
}

@Injectable()
export class DishService implements IDishService {
  constructor(private dishRepository: DishRepository) {}

  async getDish(req: GetDishRequestDTO, dishId: number) {
    const { slug, companyId } = req;

    if (!slug) {
      const dish = await this.dishRepository.getDishById(dishId, companyId);
      const res = DishMapper.toGetDishResponseDto(dish);

      return res;
    }

    const dish = await this.dishRepository.getDishBySlug(slug, companyId);
    const res = DishMapper.toGetDishResponseDto(dish);

    return res;
  }

  async geDishCollection(req: GetDishCollectionRequestDTO) {
    const { categoryId, companyId, ...pagination } = req;
    const where = { categoryId, companyId };

    const dishCollection = await this.dishRepository.geDishCollection(
      pagination,
      where
    );
    const res = DishMapper.toGetDishCollectionResponseDto(dishCollection);

    return res;
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
