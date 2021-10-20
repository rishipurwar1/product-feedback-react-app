import React from "react";
import Avatar from "react-avatar";
import moment from "moment";

const Profile = ({ name, username, createdAt }) => {
  return (
    <div className="flex items-center mb-2">
      <Avatar
        name={name}
        size="40"
        round={true}
        className="block overflow-hidden focus:outline-none cursor-pointer"
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
