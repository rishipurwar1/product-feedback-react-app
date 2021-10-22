import React, { useState } from "react";

const ProfileModal = ({ logout, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative block">
      {user && (
        <div className="flex items-center mb-2">
          <img
            src={user.result.profilePhoto}
            alt="avatar"
            className="rounded h-10 block overflow-hidden focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
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
          className="absolute -bottom-12 p-2 mt-2 space-y-2 bg-white rounded-md shadow-md z-50"
          aria-label="sub-menu"
        >
          <li>
            <button
              onClick={() => {
                logout();
                setIsOpen(!isOpen);
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
