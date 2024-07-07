import React, { useState } from 'react';
import '../styles/PostStyles.css';
import { FaThumbsUp, FaHeart, FaLaugh, FaSurprise, FaComment } from 'react-icons/fa';
import avatar from '../assets/avatar.png';
import { updatePost } from '../services/api';

function Post({ post }) {
    const [reactions, setReactions] = useState(post.reactions || { like: 0, love: 0, laugh: 0, surprise: 0 });
    const [comments, setComments] = useState(post.comments || []);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});

    const handleReaction = async (type) => {
        const updatedReactions = {
            ...reactions,
            [type]: reactions[type] + 1
        };
        setReactions(updatedReactions);
        await updatePost(post.id, { reactions: updatedReactions });
    };

    const handleComment = async () => {
        if (commentText.trim()) {
            const newComment = { text: commentText, user: 'Current User', avatar };
            const updatedComments = [...comments, newComment];
            setComments(updatedComments);
            setCommentText("");
            await updatePost(post.id, { comments: updatedComments });
        }
    };

    const toggleCommentExpansion = (index) => {
        setExpandedComments((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={avatar} alt="Avatar" className="avatar" />
                <div className="post-info">
                    <div className="post-user">
                        <span className="name">{post.user}</span>
                        <span className="title">{post.title}</span>
                    </div>
                    <span className="time">{post.time}</span>
                </div>
            </div>
            <div className="post-content">
                {post.content}
            </div>
            <div className="post-footer">
                <div className="reactions">
                    <button className="icon-button" onClick={() => handleReaction('like')}>
                        <FaThumbsUp className="icon" /> {reactions.like}
                    </button>
                    <button className="icon-button" onClick={() => handleReaction('love')}>
                        <FaHeart className="icon" /> {reactions.love}
                    </button>
                    <button className="icon-button" onClick={() => handleReaction('laugh')}>
                        <FaLaugh className="icon" /> {reactions.laugh}
                    </button>
                    <button className="icon-button" onClick={() => handleReaction('surprise')}>
                        <FaSurprise className="icon" /> {reactions.surprise}
                    </button>
                    <button className="icon-button" onClick={() => setShowComments(!showComments)}>
                        <FaComment className="icon" /> {comments.length}
                    </button>
                </div>
            </div>
            {showComments && (
                <div className="comments-section">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <img src={comment.avatar} alt="Avatar" className="avatar" />
                            <div className="comment-content">
                                <span className="comment-user">{comment.user}</span>
                                <span className="comment-text">
                                    {expandedComments[index] || comment.text.length <= 100
                                        ? comment.text
                                        : `${comment.text.substring(0, 100)}...`}
                                    {comment.text.length > 100 && (
                                        <span className="see-more" onClick={() => toggleCommentExpansion(index)}>
                                            {expandedComments[index] ? ' see less' : '...see more'}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="add-comment">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                        ></textarea>
                        <button onClick={handleComment}>Comment</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
