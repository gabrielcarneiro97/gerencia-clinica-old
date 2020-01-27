import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Icon } from 'antd';

import ConsultaModalForm from './ConsultaModalForm';
import ConsultaModalProcedimentosTable from './ConsultaModalProcedimentosTable';

import ConsultaClass from '../db/models/Consulta';
import ProcedimentoClass from '../db/models/ConsultaProcedimento';

import { models } from '../db/db.service';

import { carregarInfos, carregarProcedimentos, limparConsulta } from '../store/consulta';

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
        footer={null}
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
