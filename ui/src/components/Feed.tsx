"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "./Post";
import CreatePost from "./CreatePost";
import LoadMoreButton from "./LoadMoreButton";
import { getPosts, addPost } from "@/services/api";

interface Post {
  id: string;
  user: string;
  avatar: string;
  title: string;
  content: string;
  reactions: {
    like: number;
    love: number;
    laugh: number;
    surprise: number;
  };
  comments: Array<{
    text: string;
    user: string;
    avatar: string;
  }>;
  time: string;
  userReactions?: Record<string, string>;
}

export default function Feed() {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [sortOption, setSortOption] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleAddPost = async (content: string) => {
    const newPost = {
      user: "Current User", // This will be replaced with actual user data
      avatar: "/assets/avatar.png",
      title: "Community Member",
      content,
      reactions: { like: 0, love: 0, laugh: 0, surprise: 0 },
      comments: [],
      time: new Date().toISOString(),
    };

    await addPostMutation.mutateAsync(newPost);
  };

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    if (sortOption === "oldest") {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    }
    return a.user.localeCompare(b.user);
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">Error loading posts</div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost onAddPost={handleAddPost} />
      <div className="flex items-center space-x-2 mb-4">
        <label className="font-medium">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
          className="rounded-lg border border-gray-300 px-3 py-2 bg-white"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedPosts.slice(0, visiblePosts).map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {visiblePosts < posts.length && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
    </div>
  );
}
