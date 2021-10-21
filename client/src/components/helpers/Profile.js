import React from "react";
import moment from "moment";

const Profile = ({ name, username, createdAt, profilePhoto }) => {
  return (
    <div className="flex items-center mb-2">
      <img
        src={profilePhoto}
        alt="avatar"
        className="rounded h-10 block overflow-hidden focus:outline-none cursor-pointer"
      />
      <div className="ml-2">
        <p className="text-xs text-secondary-dark">{name}</p>
        <p className="text-xs font-light text-gray-400">
          {username ? `@${username}` : moment(createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
