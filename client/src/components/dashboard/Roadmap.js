import React from "react";
import { Link } from "react-router-dom";

const Roadmap = () => {
  return (
    <div className="bg-white rounded-lg p-4 px-5">
      <div className="flex justify-between">
        <p className="inline font-bold text-lg text-primary-dark">Roadmap</p>
        <Link
          to="/"
          className="text-tertiary-dark transition underline hover:no-underline"
        >
          View
        </Link>
      </div>
      <div className="mt-5 flex justify-start ">
        <ul className="w-full list-disc list-inside">
          <li className="text-left text-yellow-500">
            <div className="text-secondary-dark inline">
              Planned <span className="float-right font-bold">2</span>
            </div>
          </li>
          <li className="text-left text-purple-600">
            <div className="text-secondary-dark inline">
              In-Progress <span className="float-right font-bold">3</span>
            </div>
          </li>
          <li className="text-left text-blue-500">
            <div className="text-secondary-dark inline">
              Live <span className="float-right font-bold">1</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;
