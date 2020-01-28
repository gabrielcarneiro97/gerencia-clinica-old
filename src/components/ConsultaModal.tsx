import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Icon,
  Row,
  Col,
} from 'antd';

import ConsultaModalForm from './ConsultaModalForm';
import ConsultaModalProcedimentosTable from './ConsultaModalProcedimentosTable';

import { models } from '../db/db.service';

import { carregarInfos, carregarProcedimentos, limparConsulta } from '../store/consulta';
import ConsultaModalSaveButton from './ConsultaModalSaveButton';

const { Consulta, ConsultaProcedimento } = models;

type propTypes = {
  id: number;
  buttonSize?: string;
}

export default function ConsultaModal(props: propTypes): JSX.Element {
  const { buttonSize = '20px', id } = props;

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      ConsultaProcedimento.findAll({
        where: {
          consultaId: id,
        },
      }).then((p) => {
        dispatch(carregarProcedimentos(p));
        Consulta.findByPk(id).then((c) => dispatch(carregarInfos(c)));
      });
    } else {
      dispatch(limparConsulta());
    }
  }, [visible]);

  const showModal = (): void => setVisible(true);
  const hideModal = (): void => setVisible(false);

  const footer = (
    <Row type="flex" justify="end">
      <Col>
        <ConsultaModalSaveButton onEnd={hideModal} />
      </Col>
    </Row>
  );

  return (
    <>
      <Button
        shape="circle"
        type="link"
        style={{ fontSize: buttonSize }}
        onClick={showModal}
      >
        <Icon type="info-circle" theme="filled" />
      </Button>
      <Modal
        title="Consulta"
        width={700}
        footer={footer}
        visible={visible}
        onCancel={hideModal}
        destroyOnClose
      >
        <ConsultaModalForm />
        <ConsultaModalProcedimentosTable />
      </Modal>
    </>
  );
}
