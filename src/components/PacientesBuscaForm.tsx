import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Op } from 'sequelize';
import { AutoComplete, Button, Col } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { DataSourceItemType } from 'antd/lib/auto-complete';

import { models } from '../db/db.service';
import PacienteClass from '../db/models/Paciente';

import { Store } from '../store/store';

import {
  carregarInfosPessoais,
  carregarEndereco,
  carregarContato,
  limparPaciente,
} from '../store/paciente';

const { Paciente } = models;

export default function PacienteBuscaForm(): JSX.Element {
  const dispatch = useDispatch();

  const infosPessoais = useSelector<Store, PacienteClass | null>(
    (store) => store.paciente.infosPessoais,
  );

  const [searchString, setSearchString] = useState();
  const [pacientesBusca, setPacientesBusca]: [PacienteClass[], Function] = useState([]);
  const [pacientesNomes, setPacientesNomes]: [DataSourceItemType[], Function] = useState([]);

  useEffect(() => () => {
    dispatch(limparPaciente());
  }, []);

  const handleChange = async (value: SelectValue): Promise<void> => {
    setSearchString(value);

    if (value !== '') {
      const pacientesDb = await Paciente.findAll({
        where: {
          nome: {
            [Op.iLike]: `%${value}%`,
          },
        },
      });

      setPacientesBusca(pacientesDb);
      setPacientesNomes(pacientesDb.map(
        (p) => ({ text: p.getDataValue('nome'), value: p.getDataValue('id') }),
      ));
    } else {
      setPacientesBusca([]);
      setPacientesNomes([]);
    }

    if (infosPessoais) dispatch(limparPaciente());
  };

  const handleSelect = async (pacienteId: SelectValue): Promise<void> => {
    const pacienteSelecionado = pacientesBusca.find(
      (p) => p.getDataValue('id') === parseInt(pacienteId as string, 10),
    );

    if (pacienteSelecionado) {
      const endereco = await pacienteSelecionado.getEndereco();
      const contato = await pacienteSelecionado.getContato();

      dispatch(carregarInfosPessoais(pacienteSelecionado));
      dispatch(carregarEndereco(endereco));
      dispatch(carregarContato(contato));
    }
  };

  const handleNovo = async () => {
    const paciente = Paciente.build();
    const endereco = await paciente.getEndereco();
    const contato = await paciente.getContato();

    setSearchString('');
    dispatch(limparPaciente());
    dispatch(carregarInfosPessoais(paciente));
    dispatch(carregarEndereco(endereco));
    dispatch(carregarContato(contato));
  };

  return (
    <>
      <Col span={20}>
        <AutoComplete
          dataSource={pacientesNomes}
          value={searchString}
          onChange={handleChange}
          placeholder="Digite o Nome do Paciente"
          onSelect={handleSelect}
          style={{ width: '100%' }}
        />
      </Col>
      <Col span={4}>
        <Button onClick={handleNovo}>
        Cadastrar Novo
        </Button>
      </Col>
    </>
  );
}
