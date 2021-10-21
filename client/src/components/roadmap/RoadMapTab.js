import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryTag from "../helpers/CategoryTag";
import CommentIcon from "../helpers/CommentIcon";
import Upvote from "../helpers/Upvote";

const RoadMapTab = ({
  plannedFeatures,
  inProgressFeatures,
  liveFeatures,
  column,
}) => {
  const [openTab, setOpenTab] = useState(1);

  let borderColor;
  switch (openTab) {
    case 1:
      borderColor = "border-status-planned";
      break;
    case 2:
      borderColor = "border-status-in-progress";
      break;
    default:
      borderColor = "border-status-live";
  }
  return (
    <>
      <div className="flex md:hidden flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap flex-row border border-b border-primary-dark text-primary-dark"
            role="tablist"
          >
            <li className="flex-auto text-center">
              <a
                className={`text-sm font-bold px-5 py-5 mt-1 block leading-relaxed 
                  ${
                    openTab === 1
                      ? `border-b-4 ${borderColor}  text-primary-dark`
                      : "border-b-4 border-transparent text-gray-400"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                {`Planned (${plannedFeatures.length})`}
              </a>
            </li>
            <li className="flex-auto text-center">
              <a
                className={`text-sm font-bold px-5 py-5 mt-1 block leading-relaxed ${
                  openTab === 2
                    ? `border-b-4 ${borderColor}  text-primary-dark`
                    : "border-b-4 border-transparent text-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                {`In-Progress (${inProgressFeatures.length})`}
              </a>
            </li>
            <li className="flex-auto text-center">
              <a
                className={`text-sm font-bold px-5 py-5 mt-1 block leading-relaxed
                  ${
                    openTab === 3
                      ? `border-b-4 ${borderColor}  text-primary-dark`
                      : "border-b-4 border-transparent text-gray-400"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                {`Live (${liveFeatures.length})`}
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col w-full mb-6 px-4">
            <div className={openTab === 1 ? "block " : "hidden"} id="link1">
              <div className="py-5">
                <h1 className="text-primary-dark font-bold">{`${column["planned"].name} (${column["planned"].items.length})`}</h1>
                <p className="text-secondary-dark text-sm">
                  {column["planned"].subTitle}
                </p>
              </div>
              <ul>
                {plannedFeatures.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={`p-4 mb-4 bg-white rounded-lg border-t-4 cursor-pointer border-status-planned`}
                    >
                      <Link to={`/feedbacks/${item._id}`}>
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
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <div className="py-5">
                <h1 className="text-primary-dark font-bold">{`${column["in-progress"].name} (${column["in-progress"].items.length})`}</h1>
                <p className="text-secondary-dark text-sm">
                  {column["in-progress"].subTitle}
                </p>
              </div>
              <ul>
                {inProgressFeatures.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={`p-4 mb-4 bg-white rounded-lg border-t-4 cursor-pointer border-status-in-progress`}
                    >
                      <Link to={`/feedbacks/${item._id}`}>
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
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              <div className="py-5">
                <h1 className="text-primary-dark font-bold">{`${column["live"].name} (${column["live"].items.length})`}</h1>
                <p className="text-secondary-dark text-sm">
                  {column["live"].subTitle}
                </p>
              </div>
              <ul>
                {liveFeatures.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={`p-4 mb-4 bg-white rounded-lg border-t-4 cursor-pointer border-status-live`}
                    >
                      <Link to={`/feedbacks/${item._id}`}>
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
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadMapTab;
