import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

// list of items
const list = [
  { name: "avatar-one" },
  { name: "avatar-two" },
  { name: "avatar-three" },
  { name: "avatar-four" },
  { name: "avatar-five" },
  { name: "avatars-six" },
  { name: "avatar-seven" },
  { name: "avatar-eight" },
  { name: "avatar-nine" },
];

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "text-black text-md" });
const ArrowRight = Arrow({ text: ">", className: "text-black text-md" });

const AvataaarsScroll = ({ setSelected, selected }) => {
  const onSelect = (key) => {
    setSelected(key);
    console.log(key);
  };

  return (
    <ScrollMenu
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      selected={selected}
      onSelect={onSelect}
      // className="overflow-x-hidden"
    >
      {list.map((item) => (
        <div
          className={`p-3 mt-2 select-none cursor-pointer rounded-full w-20 border-2 ${
            item.name === selected ? "border-purple-500" : "border-transparent"
          }`}
          onClick={() => onSelect(item.name)}
          key={item.name}
        >
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${item.name}.svg`}
            alt={item.name}
          />
        </div>
      ))}
    </ScrollMenu>
  );
};

export default AvataaarsScroll;
