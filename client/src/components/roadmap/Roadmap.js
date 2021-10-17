import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import uuid from "uuid/v4";
import { getFeedbacks, updateFeedback } from "../../actions/feedbacks";
import RoadmapHeader from "./RoadmapHeader";

const Roadmap = () => {
  const feedbacks = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();
  let plannedFeatures = [];
  let inProgressFeatures = [];
  let liveFeatures = [];

  feedbacks &&
    feedbacks.forEach((feedback) => {
      if (feedback.status === "planned") {
        plannedFeatures = [...plannedFeatures, feedback];
      } else if (feedback.status === "in-progress") {
        inProgressFeatures = [...inProgressFeatures, feedback];
      } else if (feedback.status === "live") {
        liveFeatures = [...liveFeatures, feedback];
      } else {
        return;
      }
    });

  const columnsFromBackend = {
    [uuid()]: {
      name: "Planned",
      subTitle: "Ideas prioritized for research",
      items: plannedFeatures,
    },
    [uuid()]: {
      name: "In-Progress",
      subTitle: "Currently being developed",
      items: inProgressFeatures,
    },
    [uuid()]: {
      name: "Live",
      subTitle: "Released features",
      items: liveFeatures,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      console.log(sourceColumn, destColumn);
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
      console.log(removed);
      switch (destColumn.name) {
        case "Planned":
          dispatch(
            updateFeedback(removed._id, { ...removed, status: "planned" })
          );
          break;
        case "In-Progress":
          dispatch(
            updateFeedback(removed._id, { ...removed, status: "in-progress" })
          );
          break;
        default:
          dispatch(updateFeedback(removed._id, { ...removed, status: "live" }));
      }
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

  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);

  if (feedbacks.length > 0) {
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
                  <p className="text-secondary-dark text-sm">
                    {column.subTitle}
                  </p>
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
                              console.log("hello");
                              return (
                                <Draggable
                                  key={item._id}
                                  draggableId={item._id}
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
                                          {item.title}
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
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Roadmap;
