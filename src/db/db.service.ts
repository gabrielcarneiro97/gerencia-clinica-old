import Endereco from './models/Endereco';
import Paciente from './models/Paciente';

export async function dbInit(): Promise<boolean> {
  try {
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
