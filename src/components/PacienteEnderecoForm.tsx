/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';

import moment, { Moment } from 'moment';
import {
  Form, Input,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { Store } from '../store/store';
import EnderecoClass from '../db/models/Endereco';

import { carregarEndereco, PacienteStore, mudou } from '../store/paciente';

import EstadoSelect from './EstadoSelect';

const { Item } = Form;

function PacienteDadosForm(props: FormComponentProps): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;

  const itemLayout = (label = 4, field?: number): object => ({
    labelCol: { span: label },
    wrapperCol: field ? { span: field } : null,
  });

  return (
    <Form layout="horizontal">
      <Item label="Logradouro" {...itemLayout(4, 8)}>
        {getFieldDecorator('logradouro')(
          <Input placeholder="Logradouro" />,
        )}
      </Item>
      <Item label="Número" {...itemLayout(4, 4)}>
        {getFieldDecorator('numero')(
          <Input placeholder="Número" />,
        )}
      </Item>
      <Item label="Complemento" {...itemLayout(4, 4)}>
        {getFieldDecorator('complemento')(
          <Input placeholder="Complemento" />,
        )}
      </Item>
      <Item label="Bairro" {...itemLayout(4, 8)}>
        {getFieldDecorator('bairro')(
          <Input placeholder="Bairro" />,
        )}
      </Item>
      <Item label="Cidade" {...itemLayout(4, 8)}>
        {getFieldDecorator('cidade')(
          <Input placeholder="Cidade" />,
        )}
      </Item>
      <Item label="Estado" {...itemLayout(4, 8)}>
        {getFieldDecorator('estado')(
          <EstadoSelect />,
        )}
      </Item>
      <Item label="País" {...itemLayout(4, 8)}>
        {getFieldDecorator('pais')(
          <Input placeholder="País" />,
        )}
      </Item>
      <Item label="CEP" {...itemLayout(4, 4)}>
        {getFieldDecorator('cep')(
          <Input placeholder="CEP" />,
        )}
      </Item>
    </Form>
  );
}

export default connect(
  ({ paciente }: Store) => ({ paciente }),
  (dispatch: any) => ({
    atualizaEndereco(endereco: EnderecoClass): void {
      dispatch(mudou());
      dispatch(carregarEndereco(endereco));
    },
  }),
)(Form.create({
  name: 'pacienteDadosForm',
  onFieldsChange(props: any, changedFields: any) {
    const {
      atualizaEndereco,
      paciente,
    }: {
      atualizaEndereco: (paciente: EnderecoClass) => void;
      paciente: PacienteStore;
    } = props;

    const { endereco } = paciente;

    if (!endereco) return;

    const fieldName = Object.keys(changedFields)[0];
    endereco.setDataValue(fieldName as any, changedFields[fieldName].value);

    atualizaEndereco(endereco);
  },
  mapPropsToFields(props: any) {
    const { paciente }: { paciente: PacienteStore } = props;

    const { endereco } = paciente;

    const createField = (fieldName: string) => ({
      [fieldName]: Form.createFormField({
        value: endereco?.getDataValue(fieldName as any),
      }),
    });

    return {
      ...createField('logradouro'),
      ...createField('numero'),
      ...createField('complemento'),
      ...createField('bairro'),
      ...createField('cidade'),
      ...createField('estado'),
      ...createField('pais'),
      ...createField('cep'),
    };
  },
})(PacienteDadosForm));
