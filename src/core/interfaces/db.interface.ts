export interface Repo<T,C> {
  count(search: string,where:C): Promise<number>;
  exists(t: number): Promise<boolean>;
  save(t: T): Promise<T>;
}
