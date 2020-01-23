import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default function PacienteTabs(): JSX.Element {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        key="1"
        tab="Informações Pessoais"
      >
        Infos Pessoais
      </TabPane>
    </Tabs>
  );
}
