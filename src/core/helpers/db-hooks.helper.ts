import { Sequelize } from 'sequelize';

export const getNextId = async (
  sequelize: Sequelize,
  sequenceName: string
): Promise<number> => {
  const [[queryResult]] = await sequelize.query(
    `SELECT nextval('${sequenceName}')`
  );

  const id = (queryResult as any)?.nextval;

  if (!id) {
    throw new Error('Error on executing query id sequence: Id is empty');
  }

  const idNumber = Number(id);

  if (typeof idNumber !== 'number') {
    throw new Error('Error on executing query id sequence');
  }

  return idNumber;
};
