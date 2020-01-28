import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import ConsultaCardDraggable from './ConsultaCardDraggable';

type propTypes = {
  title?: string;
  droppableId: string;
  consultasId: number[];
}

export default function AgendaBoardDropabble(props: propTypes): JSX.Element {
  const {
    title = '',
    droppableId,
    consultasId,
  } = props;

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Card
          ref={provided.innerRef as any}
          title={title}
        >
          {consultasId.map(
            (consultaId, index) => <ConsultaCardDraggable consultaId={consultaId} index={index} />,
          )}
        </Card>
      )}
    </Droppable>
  );
}
