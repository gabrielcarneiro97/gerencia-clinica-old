import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';

import moment from 'moment';

import { models } from '../db/db.service';
import ConsultaClass from '../db/models/Consulta';

import { Store } from '../store/store';

import { PacienteStore, carregarConsultas } from '../store/paciente';
import ConsultaModal from './ConsultaModal';

const { Consulta } = models;

export default function PacienteConsultasTable(): JSX.Element {
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
  }, [pacienteId]);

  const columns = [
    {
      title: 'Data/Hora',
      dataIndex: 'data',
      key: 'data',
      render: (v: Date): string => moment(v).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Observações',
      dataIndex: 'observacoes',
      key: 'observacoes',
      render: (str: string): JSX.Element => {
        let strs = str.split('\n');
        const big = strs.length > 2;
        if (big) strs = strs.slice(0, 2);
        return (
          <div>
            {strs.map((txt, k) => (
              <Fragment key={`${k}-span`}> {/* eslint-disable-line */ }
                <span>{txt}</span>
                <br />
              </Fragment>
            ))}
            {
              big
              && <span>...</span>
            }
          </div>
        );
      },
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
    },
    {
      title: 'Ações',
      dataIndex: 'action',
      key: 'action',
      align: 'center' as 'center',
      render: (v: number): JSX.Element => <ConsultaModal id={v} emitter="paciente" />,
    },
  ];

  const dataSource = temConsultas ? (consultas as ConsultaClass[]).map(
    (c) => {
      const consultaId = c.getDataValue('id');

      return {
        ...c.toJSON(),
        action: consultaId,
      };
    },
  ) : [];

  return (
    <Table
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={{
        simple: true,
      }}
      style={{
        backgroundColor: '#fff',
      }}
      rowKey="id"
    />
  );
}
