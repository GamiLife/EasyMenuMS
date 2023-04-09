import { Injectable } from '@nestjs/common';
import { ComboRepository } from '../infraestructure/db/combo.repository';
import {
  CreateComboRequestDTO,
  CreateComboResponseDTO,
  GetComboCollectionRequestDTO,
  GetComboCollectionResponseDTO,
  GetComboRequestDTO,
  GetComboResponseDTO,
  UpdateComboRequestDTO,
  UpdateComboResponseDTO,
} from './dtos';
import { MetaDomain } from 'src/core/domain';
import { ComboMapper } from '../infraestructure/mapper/combo.mapper';
import { MetaFactory } from 'src/core/factories';

interface IComboService {
  getComboById: (
    req: GetComboRequestDTO,
    id: number
  ) => Promise<GetComboResponseDTO>;
  geComboCollection: (
    req: GetComboCollectionRequestDTO
  ) => Promise<MetaDomain<GetComboCollectionResponseDTO[]>>;
  create: (req: CreateComboRequestDTO) => Promise<CreateComboResponseDTO>;
  update: (
    req: UpdateComboRequestDTO,
    id: number
  ) => Promise<UpdateComboResponseDTO>;
}

@Injectable()
export class ComboService implements IComboService {
  constructor(private readonly comboRepository: ComboRepository) {}

  async getComboById(
    req: GetComboRequestDTO,
    id: number
  ): Promise<GetComboResponseDTO> {
    const combo = await this.comboRepository.getComboById(id);
    const res = ComboMapper.toGetComboResponse(combo);

    return res;
  }
  async geComboCollection(
    req: GetComboCollectionRequestDTO
  ): Promise<MetaDomain<GetComboCollectionResponseDTO[]>> {
    const { companyId, ...pagination } = req;
    const where = { companyId };
    const counter = await this.comboRepository.count(
      pagination.searchBy,
      pagination.searchOp,
      where
    );

    const comboCollection = await this.comboRepository.getComboCollection(
      pagination,
      where
    );

    const data = ComboMapper.toGetComboCollectionResponseDto(comboCollection);
    const metaResponse = MetaFactory.create<any[]>({
      pagination,
      totalItems: counter,
      data,
    });
    return metaResponse;
  }

  async create(req: CreateComboRequestDTO): Promise<CreateComboResponseDTO> {
    const combo = ComboMapper.toDomainFromCreateComboRequestDto(req);

    const creation = await this.comboRepository.save(combo);
    const res = ComboMapper.toCreateComboResponseDto(creation);

    for (const item of req.dishInCombo) {
      const dishCombo =
        ComboMapper.toDishComboDomainFromCreateComboRequestDto(item);
      await this.comboRepository.createDishesCombo(dishCombo, creation.id);
    }

    for (const item of req.sauceInCombo) {
      const sauceCombo =
        ComboMapper.toSauceComboDomainFromCreateComboRequestDto(item);
      await this.comboRepository.createSaucesCombo(sauceCombo, creation.id);
    }

    return res;
  }

  async update(
    req: UpdateComboRequestDTO,
    id: number
  ): Promise<UpdateComboResponseDTO> {
    const combo = ComboMapper.toDomainFromUpdateComboRequestDto(req, id);
    const upsert = await this.comboRepository.save(combo);
    const res = ComboMapper.toUpdateComboResponseDto(upsert);

    for (const { operation, ...item } of req.dishInCombo) {
      const dishCombo =
        ComboMapper.toDishComboDomainFromCreateComboRequestDto(item);

      if (operation === 'insert') {
        await this.comboRepository.createDishesCombo(dishCombo, id);
        continue;
      }

      if (operation === 'update') {
        await this.comboRepository.updateDishesCombo(dishCombo, id, item.id);
        continue;
      }

      await this.comboRepository.deleteDishCombo(item.id);
    }

    for (const { operation, ...item } of req.sauceInCombo) {
      const sauceCombo =
        ComboMapper.toSauceComboDomainFromCreateComboRequestDto(item);

      if (operation === 'insert') {
        await this.comboRepository.createSaucesCombo(sauceCombo, id);
        continue;
      }

      if (operation === 'update') {
        await this.comboRepository.updateSaucesCombo(sauceCombo, id, item.id);
      }

      await this.comboRepository.deleteSauceCombo(item.id);
    }

    return res;
  }
}
