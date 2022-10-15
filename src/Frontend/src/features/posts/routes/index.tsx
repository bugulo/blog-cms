import { Routes, Route } from "react-router-dom";

import { Post } from "./Post";
import { Posts } from "./Posts";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Posts />} />
      <Route path=":id" element={<Post />} />
    </Routes>
  );
};
