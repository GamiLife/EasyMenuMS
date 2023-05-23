import { plainToClass } from '@nestjs/class-transformer';
import { HistoryModel } from '../db/history.model';
import { History } from '../../domain/history.entity';

abstract class AHistoryMapper {
  static toPersistence: (domain: History) => Partial<HistoryModel>;
  static toDomain: (entity: HistoryModel) => History;
  static toDomains: (entity: HistoryModel[]) => History[];
}

export class HistoryMapper extends AHistoryMapper {
  static toPersistence(domain: History): Partial<HistoryModel> {
    const model = plainToClass(HistoryModel, domain, {
      excludeExtraneousValues: true,
    });

    return {
      moduleName: model.moduleName,
      metadata: model.metadata,
      createdBy: model.createdBy,
    };
  }

  static toDomain(entity: HistoryModel): History {
    return plainToClass(History, entity);
  }

  static toDomains(entities: HistoryModel[]): History[] {
    return entities.map((entity) =>
      History.create(
        {
          moduleName: entity.moduleName,
          metadata: entity.metadata,
          createdBy: entity.createdBy,
        },
        entity.id
      )
    );
  }
}
