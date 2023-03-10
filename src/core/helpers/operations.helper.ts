import { DBError } from '../exceptions';
import { TEntityOperation } from '../types';

export function switchOperationHelper(request: TEntityOperation) {
  const { id, operations: op, ...entity } = request;

  if (!op) throw new DBError('Operation is not defined');

  if (op === 'insert') {
    this.create(entity);
    return;
  }

  if (!id) throw new DBError('Id is not defined to update or delete');

  if (op === 'update') {
    this.update(entity, {
      where: {
        id,
      },
    });
    return;
  }

  return;
}
