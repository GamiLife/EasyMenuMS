export type TOperations = 'insert' | 'update' | 'delete';

export type TEntityMixin<TEntity> = TEntity & {
  switchOperation: (entity: any) => Promise<void>;
};

export type TEntityOperation = {
  [key: string]: any;
  operation: TOperations;
};
