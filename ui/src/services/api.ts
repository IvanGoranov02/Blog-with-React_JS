import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const addPost = async (post: {
  user: string;
  avatar: string;
  title: string;
  content: string;
  reactions: Record<string, number>;
  comments: Array<{ text: string; user: string; avatar: string }>;
}) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          ...post,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: string,
  updates: Partial<{
    content: string;
    reactions: Record<string, number>;
    comments: Array<{ text: string; user: string; avatar: string }>;
    userReactions: Record<string, string>;
  }>
) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
