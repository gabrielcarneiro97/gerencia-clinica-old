import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ConsultaCard from './ConsultaCard';

type propTypes = {
  consultaId: number;
  index: number;
}

export default function ConsultaCardDraggable(props: propTypes): JSX.Element {
  const { consultaId, index } = props;

  return (
    <Draggable
      key={consultaId}
      draggableId={consultaId.toString()}
      index={index}
    >
      {(provided) => (
        <div ref={provided.innerRef}>
          <ConsultaCard id={consultaId} />
        </div>
      )}
    </Draggable>
  );
}
