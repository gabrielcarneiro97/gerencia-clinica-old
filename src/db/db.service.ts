import sequelize from './connect';

import Paciente from './models/Paciente';
import Contato from './models/Contato';
import Endereco from './models/Endereco';
import Consulta from './models/Consulta';
import ConsultaProcedimento from './models/ConsultaProcedimento';

export async function dbInit(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    await Paciente.sync({ alter: true });
    await Contato.sync({ alter: true });
    await Endereco.sync({ alter: true });
    await Consulta.sync({ alter: true });
    await ConsultaProcedimento.sync({ alter: true });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const models = {
  Paciente,
  Contato,
  Endereco,
  Consulta,
  ConsultaProcedimento,
};
