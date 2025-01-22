import React, { useEffect, useState, useContext } from "react";
import "../styles/ProfileCardStyles.css";
import editIcon from "../assets/edit-icon.png";
import avatar from "../assets/avatar.png";
import EditProfileModal from "./EditProfileModal";
import { UserContext } from "../context/UserContext";
import { PostContext } from "../context/PostContext";

function ProfileCard() {
  const { user, updateUser } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const [reactions, setReactions] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const calculateStats = () => {
      const userPosts = posts.filter((post) => post.user === user.name);
      const reactionsCount = userPosts.reduce((total, post) => {
        return (
          total +
          Object.values(post.reactions || {}).reduce(
            (sum, count) => sum + count,
            0
          )
        );
      }, 0);

      setPostsCount(userPosts.length);
      setReactions(reactionsCount);
    };

    calculateStats();
  }, [posts, user]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (newName, newTitle) => {
    updateUser(newName, newTitle);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.title}</p>
        </div>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icon"
          onClick={handleEditClick}
        />
      </div>
      <div className="profile-divider"></div>
      <div className="profile-stats">
        <div className="stat">
          <span>{reactions}</span>
          <p>Reactions</p>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <span>{postsCount}</span>
          <p>Posts</p>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentName={user.name}
        currentTitle={user.title}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default ProfileCard;
