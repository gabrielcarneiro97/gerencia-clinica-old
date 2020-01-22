import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'clinica', // db
  'postgres', // login
  '123456', // senha
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
);

export default sequelize;
