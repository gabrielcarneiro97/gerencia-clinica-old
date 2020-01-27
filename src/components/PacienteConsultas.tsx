import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';

import moment from 'moment';

import { models } from '../db/db.service';
import ConsultaClass from '../db/models/Consulta';

import { Store } from '../store/store';

import { PacienteStore, carregarConsultas } from '../store/paciente';

const { Consulta } = models;

export default function PacienteConsultas(): JSX.Element {
  const paciente = useSelector<Store, PacienteStore>((store) => store.paciente);
  const dispatch = useDispatch();

  const { consultas, infosPessoais } = paciente;

  const pacienteId = infosPessoais?.getDataValue('id') || 0;
  const temConsultas = consultas.length > 0;

  useEffect(() => {
    if (consultas.length === 0) {
      Consulta.findAll({
        where: {
          pacienteId,
        },
      }).then((consultasDb) => dispatch(carregarConsultas(consultasDb)));
    }
  }, []);

  const columns = [
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (v: Date): string => moment(v).format('DD/MM/YYYY'),
    },
    {
      title: 'Observações',
      dataIndex: 'observacoes',
      key: 'observacoes',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
    },
  ];

  const dataSource = temConsultas ? (consultas as ConsultaClass[]).map((c) => c.toJSON()) : [];

  console.log(dataSource);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
    />
  );
}
