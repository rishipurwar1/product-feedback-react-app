import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import RoadmapHeader from "./RoadmapHeader";
import RoadMapTab from "./RoadMapTab";
import DragDrop from "./DragDrop";

const columnsFromBackend = {
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

  var plannedFeatures = [];
  let inProgressFeatures = [];
  let liveFeatures = [];

  feedbacks &&
    feedbacks.forEach((feedback) => {
      if (feedback.status === "planned") {
        plannedFeatures = [...plannedFeatures, feedback];
        columnsFromBackend["planned"].items = plannedFeatures;
      } else if (feedback.status === "in-progress") {
        inProgressFeatures = [...inProgressFeatures, feedback];
        columnsFromBackend["in-progress"].items = inProgressFeatures;
      } else if (feedback.status === "live") {
        liveFeatures = [...liveFeatures, feedback];
        columnsFromBackend["live"].items = liveFeatures;
      } else {
        return;
      }
    });

  const [columns, setColumns] = useState(columnsFromBackend);

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
        <DragDrop columns={columns} setColumns={setColumns} />
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Roadmap;
