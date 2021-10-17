import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import uuid from "uuid/v4";
import { fetchFeedbacksByStatus, getFeedbacks } from "../../actions/feedbacks";
import RoadmapHeader from "./RoadmapHeader";

let plannedFeatures = [];
let inProgressFeatures = [];
let liveFeatures = [];

const itemsFromBackend = [
  {
    id: uuid(),
    content: "First task",
    description:
      "Swiping to change tabs is intuitive for Mobile users who are already used to this behavior from popular apps like WhatsApp",
  },
  {
    id: uuid(),
    content: "Second task",
    description:
      "Swiping to change tabs is intuitive for Mobile users who are already used to this behavior from popular apps like WhatsApp",
  },
  {
    id: uuid(),
    content: "Third task",
    description:
      "Swiping to change tabs is intuitive for Mobile users who are already used to this behavior from popular apps like WhatsApp",
  },
  {
    id: uuid(),
    content: "Fourth task",
    description:
      "Swiping to change tabs is intuitive for Mobile users who are already used to this behavior from popular apps like WhatsApp",
  },
  {
    id: uuid(),
    content: "Fifth task",
    description:
      "Swiping to change tabs is intuitive for Mobile users who are already used to this behavior from popular apps like WhatsApp",
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Planned",
    subTitle: "Ideas prioritized for research",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "In-Progress",
    subTitle: "Currently being developed",
    items: [],
  },
  [uuid()]: {
    name: "Live",
    subTitle: "Released features",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
    // console.log(columns);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Roadmap = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const feedbacks = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();

  feedbacks &&
    feedbacks.forEach((feedback) => {
      //   console.log(feedback);
      if (feedback.status === "planned") {
        plannedFeatures = [...plannedFeatures, feedback];
        // plannedFeatures.push(feedback);
      } else if (feedback.status === "in-progress") {
        inProgressFeatures = [...inProgressFeatures, feedback];
        // inProgressFeatures.push(feedback);
      } else if (feedback.status === "live") {
        liveFeatures = [...liveFeatures, feedback];
        // liveFeatures.push(feedback);
      } else {
        return;
      }
    });

  console.log(plannedFeatures, inProgressFeatures, liveFeatures);

  return (
    <div className="row-start-2 row-end-3 col-start-1 col-end-2 mx-auto">
      <RoadmapHeader />
      <div className="w-full max-w-5xl mt-10 flex h-screen">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            let borderColor;
            switch (column.name) {
              case "Planned":
                borderColor = "border-status-planned";
                break;
              case "In-Progress":
                borderColor = "border-status-in-progress";
                break;
              default:
                borderColor = "border-status-live";
            }
            return (
              <div className="flex flex-col" key={columnId}>
                <h1 className="text-primary-dark font-bold">{column.name}</h1>
                <p className="text-secondary-dark text-sm">{column.subTitle}</p>
                <div className="my-2">
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="py-4 pr-6 w-80"
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-4 mb-2 bg-white rounded-lg border-t-4 ${borderColor}`}
                                    >
                                      <h2
                                        className={`text-primary-dark font-bold `}
                                      >
                                        {item.content}
                                      </h2>
                                      <p className="text-secondary-dark text-sm">
                                        {item.description}
                                      </p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Roadmap;
