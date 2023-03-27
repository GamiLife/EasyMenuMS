import { FilteringPayload } from '../dtos';

export interface Repo<T, C> {
  count(
    searchBy: FilteringPayload['searchBy'],
    searchOp: FilteringPayload['searchOp'],
    where: C
  ): Promise<number>;
  exists(t: number): Promise<boolean>;
  save(t: T): Promise<T>;
}
