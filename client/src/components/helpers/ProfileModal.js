import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";

const ProfileModal = ({ logout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <div className="relative block">
      {user && (
        <div className="flex items-center mb-2">
          <Avatar
            name={user.result.name}
            size="40"
            round={true}
            onClick={() => setIsOpen(!isOpen)}
            className="block overflow-hidden focus:outline-none cursor-pointer"
          />
          <div className="ml-2">
            <p className="text-sm text-white">{user.result.name}</p>
            <p className="text-xs font-bold text-white">
              {`@${user.result.username}`}
            </p>
          </div>
        </div>
      )}
      {isOpen && (
        <ul
          className="absolute -bottom-12 p-2 mt-2 space-y-2 bg-white rounded-md shadow-md"
          aria-label="sub-menu"
        >
          <li>
            <button
              onClick={() => {
                logout();
                setIsOpen(!isOpen);
                history.push("/auth");
              }}
              className="block px-2 py-1 text-primary-dark"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileModal;
