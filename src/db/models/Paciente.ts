import { Model, DataTypes } from 'sequelize';
import sequelize from '../connect';
import Endereco from './Endereco';

export default class Paciente extends Model {
  public id!: number;
  public cpf!: string | null;
  public nome!: string | null;
  public filiacao1!: string | null;
  public filiacao2!: string | null;
  public sexo!: string | null;
  public nascimento!: Date | null;
  public enderecoId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async getEndereco(): Promise<Endereco | null> {
    if (!this.enderecoId) return null;

    return Endereco.findByPk(this.enderecoId);
  }
}

Paciente.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: {
    type: new DataTypes.STRING(),
    unique: true,
  },
  nome: new DataTypes.STRING(),
  filiacao1: new DataTypes.STRING(),
  filiacao2: new DataTypes.STRING(),
  sexo: new DataTypes.STRING(1),
  nascimento: new DataTypes.DATE(),
}, {
  tableName: 'pacientes',
  modelName: 'paciente',
  sequelize,
});
