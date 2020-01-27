import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Typography,
} from 'antd';

import { Store } from '../store/store';
import ConsultaProcedimentoClass from '../db/models/ConsultaProcedimento';

const { Text } = Typography;

export default function ConsultaModalProcedimentosTable(): JSX.Element {
  const procedimentos = useSelector<Store, ConsultaProcedimentoClass[]>(
    (store: Store) => store.consulta.procedimentos,
  );
  const dispatch = useDispatch();

  const header = () => (
    <Row gutter={8}>
      <Col span={12}>
        <Text strong>
          Procedimentos
        </Text>
      </Col>
      <Col span={12} style={{ textAlign: 'end' }}>
        Action
      </Col>
    </Row>
  );

  return (
    <Table
      bordered
      title={header}
    />
  );
}
