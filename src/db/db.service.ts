import Endereco from './models/Endereco';
import Paciente from './models/Paciente';
import sequelize from './connect';

export async function dbInit(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    await Endereco.sync({ alter: true });
    await Paciente.sync({ alter: true });
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
