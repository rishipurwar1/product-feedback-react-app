import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getFeedbacks, updateFeedback } from "../../actions/feedbacks";
import CategoryTag from "../helpers/CategoryTag";
import CommentIcon from "../helpers/CommentIcon";
import Upvote from "../helpers/Upvote";
import RoadmapHeader from "./RoadmapHeader";
import { Link } from "react-router-dom";
import RoadMapTab from "./RoadMapTab";

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
    planned: {
      name: "Planned",
      subTitle: "Ideas prioritized for research",
      items: plannedFeatures,
    },
    "in-progress": {
      name: "In-Progress",
      subTitle: "Currently being developed",
      items: inProgressFeatures,
    },
    live: {
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
      switch (destColumn.name) {
        case "Planned":
          dispatch(
            updateFeedback(
              removed._id,
              { ...removed, status: "planned" },
              "roadmap"
            )
          );
          break;
        case "In-Progress":
          dispatch(
            updateFeedback(
              removed._id,
              { ...removed, status: "in-progress" },
              "roadmap"
            )
          );
          break;
        default:
          dispatch(
            updateFeedback(
              removed._id,
              { ...removed, status: "live" },
              "roadmap"
            )
          );
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
      <div className="mx-auto md:mt-16 max-w-5xl md:px-5">
        <Helmet>
          <title>Roadmap - Kanban Board</title>
          <meta
            name="description"
            content="roadmap for our codingspace opensource project"
          />
        </Helmet>
        <RoadmapHeader />
        <RoadMapTab
          plannedFeatures={plannedFeatures}
          inProgressFeatures={inProgressFeatures}
          liveFeatures={liveFeatures}
          column={columns}
        />
        <div className="hidden w-full mt-10 md:grid grid-cols-3 gap-4 lg:gap-8 h-screen px-2 sm:px-5">
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
                <div className="" key={columnId}>
                  <h1 className="text-primary-dark font-bold">{`${column.name} (${column.items.length})`}</h1>
                  <p className="text-secondary-dark text-sm">
                    {column.subTitle}
                  </p>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="mt-6 space-y-4 lg:space-y-6"
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-4 mb-4 bg-white rounded-lg border-t-4 cursor-pointer ${borderColor}`}
                                    >
                                      <Link to={`/feedbacks/${item._id}`}>
                                        <h2
                                          className={`text-primary-dark font-bold `}
                                        >
                                          {item.title}
                                        </h2>
                                        <p className="text-secondary-dark text-sm">
                                          {item.description}
                                        </p>
                                        <CategoryTag btnName={item.category} />
                                        <div className="flex justify-between">
                                          <Upvote upvotes={item.upvotes} />
                                          <CommentIcon
                                            comments={item.comments.length}
                                          />
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
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
