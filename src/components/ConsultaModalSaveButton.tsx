import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, message } from 'antd';

import { Store } from '../store/store';
import { ConsultaStore, persitido } from '../store/consulta';


type propTypes = {
  onEnd?: Function;
}

export default function ConsultaModalSaveButton(props: propTypes): JSX.Element {
  const dispatch = useDispatch();
  const consulta = useSelector<Store, ConsultaStore>((state) => state.consulta);

  const { diferenteDoDb } = consulta;

  const { onEnd } = props;

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (diferenteDoDb) setDisabled(false);
  }, [diferenteDoDb]);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    const { procedimentos, infos } = consulta;
    try {
      await Promise.all(procedimentos.map(async (p) => p.save()));
      await infos?.save();

      dispatch(persitido());

      message.success('Consulta Atualizada com Sucesso!', 1);
    } catch (err) {
      console.error(err);
      message.error('Erro ao Salvar a Consulta!', 1);
    }
    setLoading(false);

    if (onEnd) onEnd();
  };

  return (
    <Button
      type="primary"
      disabled={disabled || loading}
      loading={loading}
      onClick={handleClick}
    >
      Salvar
    </Button>
  );
}
