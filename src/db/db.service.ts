import sequelize from './connect';

import Endereco from './models/Endereco';
import Paciente from './models/Paciente';
import Contato from './models/Contato';

export async function dbInit(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    await Paciente.sync({ alter: true });
    await Contato.sync({ alter: true });
    await Endereco.sync({ alter: true });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function getDb(): void {
  console.log('lul');
}

export const models = {
  Paciente,
  Endereco,
};
