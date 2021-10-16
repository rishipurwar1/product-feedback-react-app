import React from "react";
import Avatar from "react-avatar";
import moment from "moment";

const Profile = ({ name, createdAt }) => {
  return (
    <div className="flex items-center mb-2">
      <img
        src={`https://avatars.dicebear.com/api/avataaars/${new Date().toISOString()}.svg`}
        height={36}
        width={36}
        className="rounded-full overflow-hidden"
        alt="presentation"
      />
      <div className="ml-2">
        <p className="text-xs text-secondary-dark">{name}</p>
        <p className="text-xs font-light text-gray-400">
          {moment(createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
