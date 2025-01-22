import React, { createContext, useState, useEffect } from 'react';
import { getPosts } from '../services/api';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const addNewPost = (post) => {
        setPosts(prevPosts => [post, ...prevPosts]);
    };

    const updatePosts = (updatedPosts) => {
        setPosts(updatedPosts);
    };

    const updatePostReactions = (id, reactions) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === id ? { ...post, reactions } : post
            )
        );
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, addNewPost, updatePostReactions, updatePosts }}>
            {children}
        </PostContext.Provider>
    );
};
