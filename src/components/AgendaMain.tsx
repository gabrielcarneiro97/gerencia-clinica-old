import React from 'react';
import { Row, Col } from 'antd';
import ConsultaCard from './ConsultaCard';

export default function AgendaMain(): JSX.Element {
  return (
    <div>
      <Row gutter={8}>
        <Col span={6}>
          <ConsultaCard id={7} />
        </Col>
      </Row>
    </div>
  );
}
