import React from 'react';
import { Layout } from 'antd';

import Head from './Head';

const {
  Header, Sider, Content, Footer,
} = Layout;

export default function Main(): JSX.Element {
  return (
    <Layout>
      <Header>
        <Head />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <div>Teste</div>
        </Sider>
        <Layout>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: window.innerHeight - 64 /* altura header */ - 69 /* altura footer */,
            }}
          >
            <div>Teste</div>
          </Content>
        </Layout>
      </Layout>
      <Footer>
        <div>Teste</div>
      </Footer>
    </Layout>
  );
}
