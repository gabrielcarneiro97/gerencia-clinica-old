import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Menu, Icon } from 'antd';


export default function SideMenu(): JSX.Element {
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname.split('?')[0]]}
      style={{ height: '92%', borderRight: 0, backgroundColor: 'white' }}
    >
      <Menu.Item key="/teste1">
        <Link to="/teste1">
          <Icon type="download" />
        Importar Notas
        </Link>
      </Menu.Item>
      <Menu.Item key="/teste2">
        <Link to="/teste2">
          <Icon type="team" />
        Gerenciar Clientes
        </Link>
      </Menu.Item>
    </Menu>
  );
}
