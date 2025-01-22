import React, { useState } from "react";
import "../styles/CreatePostStyles.css";

function CreatePost({ onAddPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddPost(content);
      setContent("");
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something to the community..."
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
