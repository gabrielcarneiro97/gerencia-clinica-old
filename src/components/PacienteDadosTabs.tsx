import React from 'react';
import { Tabs } from 'antd';

import PacienteInfosPessoaisForm from './PacienteInfosPessoaisForm';

const { TabPane } = Tabs;

export default function PacienteDadosTabs(): JSX.Element {
  return (
    <Tabs
      defaultActiveKey="1"
      style={{
        marginTop: -16,
      }}
    >
      <TabPane
        key="1"
        tab="Informações Pessoais"
      >
        <PacienteInfosPessoaisForm />
      </TabPane>
      <TabPane
        key="2"
        tab="Endereço"
      >
        Endereço
      </TabPane>
      <TabPane
        key="3"
        tab="Contato"
      >
        Contato
      </TabPane>
    </Tabs>
  );
}
