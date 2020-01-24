import { Model, DataTypes } from 'sequelize';
import sequelize from '../connect';

import Paciente from './Paciente';

export default class Consulta extends Model {
  public id!: number;
  public data!: Date | null;
  public responsavel!: string | null;
  public observacoes!: string | null;

  public pacienteId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async getPaciente(): Promise<Paciente | null> {
    const pacienteId = this.getDataValue('pacienteId');
    if (!pacienteId) return null;

    return Paciente.findByPk(pacienteId as number);
  }
}

Consulta.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  data: new DataTypes.DATE(),
  responsavel: new DataTypes.STRING(),
  observacoes: new DataTypes.STRING(),
  pacienteId: {
    type: new DataTypes.INTEGER(),
    references: {
      model: Paciente,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'consultas',
  modelName: 'consulta',
  sequelize,
});
