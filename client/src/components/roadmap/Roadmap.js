import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import RoadmapHeader from "./RoadmapHeader";
import RoadMapTab from "./RoadMapTab";
import DragDrop from "./DragDrop";
import EmptyState from "../feedback/EmptyState";

const columnsData = {
  planned: {
    name: "Planned",
    subTitle: "Ideas prioritized for research",
    items: [],
  },
  "in-progress": {
    name: "In-Progress",
    subTitle: "Currently being developed",
    items: [],
  },
  live: {
    name: "Live",
    subTitle: "Released features",
    items: [],
  },
};

const Roadmap = () => {
  const feedbacks = useSelector((state) => state.feedbacks);

  let plannedFeatures = [];
  let inProgressFeatures = [];
  let liveFeatures = [];

  feedbacks &&
    feedbacks.forEach((feedback) => {
      if (feedback.status === "planned") {
        plannedFeatures = [...plannedFeatures, feedback];
        columnsData["planned"].items = plannedFeatures;
      } else if (feedback.status === "in-progress") {
        inProgressFeatures = [...inProgressFeatures, feedback];
        columnsData["in-progress"].items = inProgressFeatures;
      } else if (feedback.status === "live") {
        liveFeatures = [...liveFeatures, feedback];
        columnsData["live"].items = liveFeatures;
      } else {
        return;
      }
    });

  const [columns, setColumns] = useState(columnsData);

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
      {feedbacks.length > 0 ? (
        <>
          <RoadMapTab
            plannedFeatures={plannedFeatures}
            inProgressFeatures={inProgressFeatures}
            liveFeatures={liveFeatures}
            column={columns}
          />
          <DragDrop columns={columns} setColumns={setColumns} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Roadmap;
