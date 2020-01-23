import React from 'react';
import { Layout, Col, Row } from 'antd';

import PacienteBuscaForm from './PacientesBuscaForm';
import PacienteTabs from './PacienteTabs';

export default function PacientesMain(): JSX.Element {
  return (
    <Layout>
      <Row>
        <Col>
          <PacienteBuscaForm />
        </Col>
      </Row>
      <Row>
        <PacienteTabs />
      </Row>
    </Layout>
  );
}
