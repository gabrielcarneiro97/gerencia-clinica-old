import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Col, Row } from 'antd';

import PacienteBuscaForm from './PacientesBuscaForm';
import PacienteTabs from './PacienteTabs';

import { Store } from '../store/store';
import Paciente from '../db/models/Paciente';

export default function PacientesMain(): JSX.Element {
  const pacienteSelecionado = useSelector<Store, Paciente | null>(
    (state) => state.pacienteSelecionado,
  );

  console.log(pacienteSelecionado);

  return (
    <Layout>
      <Row>
        <Col>
          <PacienteBuscaForm />
        </Col>
      </Row>
      <Row>
        {
          pacienteSelecionado
          && <PacienteTabs />
        }
      </Row>
    </Layout>
  );
}
