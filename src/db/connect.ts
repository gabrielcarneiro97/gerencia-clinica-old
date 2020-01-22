import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const sequelize = new Sequelize(
  'clinica', // db
  'postgres', // login
  '123456', // senha
  {
    host: 'localhost',
    dialectModule: pg,
    logging: false,
  },
);

export default sequelize;
