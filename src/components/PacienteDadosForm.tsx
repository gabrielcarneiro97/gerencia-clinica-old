/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import { Form, Input, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { Store } from '../store/store';
import Paciente from '../db/models/Paciente';

const { Item } = Form;

function PacienteDadosForm(props: FormComponentProps): JSX.Element {
  const { form } = props;
  const { getFieldDecorator } = form;

  const pacienteSelecionado = useSelector<Store, Paciente | null>(
    (state) => state.pacienteSelecionado,
  );

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form layout="horizontal">
      <Item label="Nome" {...formItemLayout}>
        {getFieldDecorator('nome', {
          initialValue: pacienteSelecionado?.getDataValue('nome'),
        })(
          <Input placeholder="Nome" />,
        )}
      </Item>
      <Item label="CPF" {...formItemLayout}>
        {getFieldDecorator('cpf', {
          initialValue: pacienteSelecionado?.getDataValue('cpf'),
        })(
          <Input placeholder="CPF" />,
        )}
      </Item>
      <Item label="Nascimento" {...formItemLayout}>
        {getFieldDecorator('nascimento', {
          initialValue: moment(pacienteSelecionado?.getDataValue('nascimento') || ''),
        })(
          <DatePicker format="DD/MM/YYYY" />,
        )}
      </Item>
    </Form>
  );
}

export default Form.create()(PacienteDadosForm);
