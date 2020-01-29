import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import AgendaBoardDroppable from './AgendaBoardDroppable';

const reorder = (list: any, startIndex: any, endIndex: any): any => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any,
): any => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function AgendaMain(): JSX.Element {
  const [agendadosList, setAgendadosList] = useState([7]); // id: 1
  const [esperaList, setEsperaList] = useState([]); // id: 2
  const [atendimentoList, setAtendimentoList] = useState([]); // id: 3
  const [concluidoList, setConcluidoList] = useState([]); // id: 4
  const [ausentesList, setAusentesList] = useState([]); // id: 5

  const getList = (id: string): any[] => {
    switch (id) {
      case '1':
        return agendadosList;
      case '2':
        return esperaList;
      case '3':
        return atendimentoList;
      case '4':
        return concluidoList;
      case '5':
        return ausentesList;
      default:
        return [];
    }
  };

  const getSetter = (id: string): Function => {
    switch (id) {
      case '1':
        return setAgendadosList;
      case '2':
        return setEsperaList;
      case '3':
        return setAtendimentoList;
      case '4':
        return setConcluidoList;
      case '5':
        return setAusentesList;
      default:
        return () => true;
    }
  };

  const onDragEnd = (result: DropResult): any => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceId = source.droppableId;

      const items = reorder(
        getList(sourceId),
        source.index,
        destination.index,
      );

      getSetter(sourceId)(items);
    } else {
      const sourceId = source.droppableId;
      const destId = destination.droppableId;

      const moved = move(
        getList(sourceId),
        getList(destId),
        source,
        destination,
      );

      getSetter(destId)(moved[destId]);
      getSetter(sourceId)(moved[sourceId]);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={8}>
        <Col span={6}>
          <AgendaBoardDroppable
            title="Agendados"
            droppableId="1"
            consultasId={agendadosList}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <AgendaBoardDroppable
            title="Sala de Espera"
            droppableId="2"
            consultasId={esperaList}
          />
        </Col>
      </Row>
    </DragDropContext>
  );
}
