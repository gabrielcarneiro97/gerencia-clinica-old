import React from 'react';
import { Layout, Col, Row } from 'antd';
import PacienteBuscaForm from './PacientesBuscaForm';


export default function PacientesMain(): JSX.Element {
  return (
    <Layout>
      <Row>
        <Col>
          <PacienteBuscaForm />
        </Col>
      </Row>
    </Layout>
  );
}
