/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';

import moment, { Moment } from 'moment';
import {
  Form, Input, DatePicker, Select,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { Store } from '../store/store';
import PacienteClass from '../db/models/Paciente';
import { carregarInfosPessoais, PacienteStore } from '../store/paciente';

const { Item } = Form;
const { Option } = Select;

function PacienteDadosForm(props: FormComponentProps): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;

  const itemLayout = (label = 4, field?: number): object => ({
    labelCol: { span: label },
    wrapperCol: field ? { span: field } : null,
  });

  return (
    <Form layout="horizontal">
      <Item label="Nome" {...itemLayout(4, 8)}>
        {getFieldDecorator('nome')(
          <Input placeholder="Nome" />,
        )}
      </Item>
      <Item label="CPF" {...itemLayout(4, 4)}>
        {getFieldDecorator('cpf')(
          <Input placeholder="CPF" />,
        )}
      </Item>
      <Item label="Nascimento" {...itemLayout(4, 4)}>
        {getFieldDecorator('nascimento')(
          <DatePicker format="DD/MM/YYYY" />,
        )}
      </Item>
      <Item label="Sexo" {...itemLayout(4, 4)}>
        {getFieldDecorator('sexo')(
          <Select>
            <Option value="F">Feminino</Option>
            <Option value="M">Masculino</Option>
          </Select>,
        )}
      </Item>
      <Item label="Nome Mãe" {...itemLayout(4, 8)}>
        {getFieldDecorator('filiacao1')(
          <Input placeholder="Nome Mãe" />,
        )}
      </Item>
      <Item label="Nome Pai" {...itemLayout(4, 8)}>
        {getFieldDecorator('filiacao2')(
          <Input placeholder="Nome Pai" />,
        )}
      </Item>
    </Form>
  );
}

export default connect(
  ({ paciente }: Store) => ({ paciente }),
  (dispatch: any) => ({
    atualizaInfosPessoais(paciente: PacienteClass): void {
      dispatch(carregarInfosPessoais(paciente));
    },
  }),
)(Form.create({
  name: 'pacienteDadosForm',
  onFieldsChange(props: any, changedFields: any) {
    const {
      atualizaInfosPessoais,
      paciente,
    }: {
      atualizaInfosPessoais: (paciente: PacienteClass) => void;
      paciente: PacienteStore;
    } = props;

    const { infosPessoais } = paciente;

    if (!infosPessoais) return;

    const fieldName = Object.keys(changedFields)[0];
    if (fieldName === 'nascimento') {
      infosPessoais.setDataValue(
        fieldName as any, (changedFields[fieldName].value as Moment).toDate(),
      );
    } else {
      infosPessoais.setDataValue(fieldName as any, changedFields[fieldName].value);
    }
    atualizaInfosPessoais(infosPessoais);
  },
  mapPropsToFields(props: any) {
    const { paciente }: { paciente: PacienteStore } = props;

    const { infosPessoais } = paciente;

    const createField = (fieldName: string) => ({
      [fieldName]: Form.createFormField({
        value: fieldName !== 'nascimento'
          ? infosPessoais?.getDataValue(fieldName as any)
          : moment(infosPessoais?.getDataValue(fieldName as any) || ''),
      }),
    });

    return {
      ...createField('nome'),
      ...createField('cpf'),
      ...createField('nascimento'),
      ...createField('sexo'),
      ...createField('filiacao1'),
      ...createField('filiacao2'),
    };
  },
})(PacienteDadosForm));
