import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateFeedback } from "../../actions/feedbacks";
import CategoryTag from "../helpers/CategoryTag";
import CommentIcon from "../helpers/CommentIcon";
import Upvote from "../helpers/Upvote";

const DragDrop = ({ columns }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [card, setCard] = useState({});
  const dispatch = useDispatch();

  const onDragStart = (card) => {
    setCard(card);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = async (columnName) => {
    if (!user?.result?.name) {
      toast.error("You're not logged in!");
      return null;
    }

    if (card?.status === columnName) return;

    // remove card from source column
    const sourceColumn = columns[card.status];
    const sourceItems = sourceColumn.items.filter(
      (item) => item._id !== card._id
    );
    sourceColumn.items = sourceItems;

    // add card to destination column
    const destinationColumn = columns[columnName];
    const destinationItems = [...destinationColumn.items, card];
    destinationColumn.items = destinationItems;

    switch (columnName) {
      case "planned":
        await dispatch(
          updateFeedback(card._id, { ...card, status: "planned" }, "roadmap")
        );
        break;
      case "in-progress":
        await dispatch(
          updateFeedback(
            card._id,
            { ...card, status: "in-progress" },
            "roadmap"
          )
        );
        break;
      default:
        await dispatch(
          updateFeedback(card._id, { ...card, status: "live" }, "roadmap")
        );
    }
    setCard({});
  };

  return (
    <div className="hidden w-full mt-10 md:grid grid-cols-3 gap-4 lg:gap-8 h-screen px-2 sm:px-5">
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
          <div key={columnId}>
            <h1 className="text-primary-dark font-bold">{`${column.name} (${column.items.length})`}</h1>
            <p className="text-secondary-dark text-sm">{column.subTitle}</p>

            <ul
              className="mt-6 space-y-4 lg:space-y-6 min-h-screen"
              onDragOver={(e) => onDragOver(e)}
              onDrop={() => onDrop(columnId)}
            >
              {column.items.map((item) => {
                return (
                  <li
                    className={`p-4 mb-4 bg-white rounded-lg border-t-4 cursor-move ${borderColor}`}
                    draggable
                    onDragStart={() => onDragStart(item)}
                    key={item._id}
                  >
                    <div>
                      <h2 className={`text-primary-dark font-bold `}>
                        {item.title}
                      </h2>
                      <p className="text-secondary-dark text-sm">
                        {item.description}
                      </p>
                      <CategoryTag btnName={item.category} />
                      <div className="flex justify-between">
                        <Upvote upvotes={item.upvotes.length} />
                        <CommentIcon comments={item.comments.length} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DragDrop;
