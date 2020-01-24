import { Model, DataTypes } from 'sequelize';
import sequelize from '../connect';

export default class Paciente extends Model {
  public id!: number;
  public ddd!: string | null;
  public numero!: string | null;

  public getNumeroMask(): string {
    const ddd = this.getDataValue('ddd');
    const numero = this.getDataValue('numero');

    if (!numero) return '';

    const pontoDeDivisao = numero.length === 9 ? 5 : 4;

    return `(${ddd}) ${numero.slice(0, pontoDeDivisao)}-${numero.slice(pontoDeDivisao)}`;
  }
}

Paciente.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  ddd: new DataTypes.STRING(2),
  numero: new DataTypes.STRING(9),
}, {
  tableName: 'telefones',
  modelName: 'telefone',
  sequelize,
});
