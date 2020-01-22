import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('clinica', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

console.log(sequelize);
sequelize.authenticate().then(console.log).catch(console.error);
