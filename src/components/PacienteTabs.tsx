import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';

import PacienteDadosTabs from './PacienteDadosTabs';

import { Store } from '../store/store';
import Paciente from '../db/models/Paciente';


const { TabPane } = Tabs;

export default function PacienteTabs(): JSX.Element {
  const infosPessoais = useSelector<Store, Paciente | null>(
    (state) => state.paciente.infosPessoais,
  );

  const pacienteNoBanco = infosPessoais && infosPessoais.getDataValue('id');

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        key="1"
        tab="Dados"
        disabled={!infosPessoais}
      >
        {
          infosPessoais
          && <PacienteDadosTabs />
        }
      </TabPane>
      <TabPane
        key="2"
        tab="Consultas"
        disabled={!pacienteNoBanco}
      >
        Consultas
      </TabPane>
    </Tabs>
  );
}
