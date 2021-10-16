import React from "react";
import Tag from "../helpers/Tag";
import { tags } from "../../utils/tags";

const FilterFeedbacks = ({ filterExperiences }) => {
  const handleClick = (searchTerm) => {
    filterExperiences(searchTerm);
  };
  return (
    <div className=" bg-white rounded-lg p-4 my-4">
      <h2 className="text-md text-left text-primary-dark font-bold mb-3">
        Popular Tags
      </h2>
      <div className="flex justify-start flex-wrap">
        {tags.map((tag) => (
          <Tag btnName={tag.name} key={tag.name} />
        ))}
      </div>
    </div>
  );
};

export default FilterFeedbacks;
