import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { Store } from '../store/store';

import { PacienteStore, persitido } from '../store/paciente';

export default function PacienteSaveButton(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pacienteStore: PacienteStore = useSelector<Store, PacienteStore>(
    (store) => store.paciente,
  );

  const { diferenteDoDb } = pacienteStore;

  const handleClick = async (): Promise<void> => {
    const { infosPessoais, endereco, contato } = pacienteStore;
    setLoading(true);
    if (infosPessoais) {
      await infosPessoais.saveAll(endereco, contato);
      dispatch(persitido());
    }
    setLoading(false);
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      disabled={!diferenteDoDb || loading}
      loading={loading}
    >
      Salvar
    </Button>
  );
}
