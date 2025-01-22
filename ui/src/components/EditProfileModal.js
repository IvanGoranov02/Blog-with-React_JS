import React, { useState } from "react";
import "../styles/EditProfileModalStyles.css";

function EditProfileModal({
  isOpen,
  onClose,
  currentName,
  currentTitle,
  onSave,
}) {
  const [name, setName] = useState(currentName);
  const [title, setTitle] = useState(currentTitle);

  const handleSave = () => {
    onSave(name, title);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
