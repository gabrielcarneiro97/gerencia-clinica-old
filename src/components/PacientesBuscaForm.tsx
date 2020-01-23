import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Op } from 'sequelize';
import { AutoComplete } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { DataSourceItemType } from 'antd/lib/auto-complete';

import { models } from '../db/db.service';
import PacienteClass from '../db/models/Paciente';

import { carregarPacienteSelecionado } from '../store/store';

const { Paciente } = models;

export default function PacienteBuscaForm(): JSX.Element {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState();
  const [pacientesBusca, setPacientesBusca]: [PacienteClass[], Function] = useState([]);
  const [pacientesNomes, setPacientesNomes]: [DataSourceItemType[], Function] = useState([]);

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
  };

  const handleSelect = (pacienteId: SelectValue): void => {
    const pacienteSelecionado = pacientesBusca.find(
      (p) => p.getDataValue('id') === parseInt(pacienteId as string, 10),
    );

    if (pacienteSelecionado) dispatch(carregarPacienteSelecionado(pacienteSelecionado));
  };

  return (
    <AutoComplete
      dataSource={pacientesNomes}
      value={searchString}
      onChange={handleChange}
      placeholder="Digite o Nome do Paciente"
      onSelect={handleSelect}
      style={{ width: '100%' }}
    />
  );
}
