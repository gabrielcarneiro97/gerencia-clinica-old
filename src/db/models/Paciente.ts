import { Model, DataTypes } from 'sequelize';
import sequelize from '../connect';

import Endereco from './Endereco';

export default class Paciente extends Model {
  public id!: number;
  public cpf!: string | null;
  public nome!: string | null;
  public sexo!: string | null;
  public nascimento!: Date | null;
  public enderecoId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Paciente.init({
  id: {
    type: new DataTypes.INTEGER.UNSIGNED(),
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: new DataTypes.STRING(),
  nome: new DataTypes.STRING(),
  sexo: new DataTypes.STRING(1),
  nascimento: new DataTypes.DATE(),
  enderecoId: {
    type: new DataTypes.INTEGER.UNSIGNED(),
    references: {
      model: Endereco,
      key: 'id',
    },
  },
}, {
  tableName: 'pacientes',
  modelName: 'paciente',
  sequelize,
});
