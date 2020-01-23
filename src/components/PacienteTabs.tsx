import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';

import PacienteDadosForm from './PacienteDadosForm';

import { Store } from '../store/store';
import Paciente from '../db/models/Paciente';


const { TabPane } = Tabs;

export default function PacienteTabs(): JSX.Element {
  const pacienteSelecionado = useSelector<Store, Paciente | null>(
    (state) => state.pacienteSelecionado,
  );

  const pacienteNoBanco = pacienteSelecionado && pacienteSelecionado.getDataValue('id');

  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        key="1"
        tab="Informações Pessoais"
        disabled={!pacienteSelecionado}
      >
        {
          pacienteSelecionado
          && <PacienteDadosForm />
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
