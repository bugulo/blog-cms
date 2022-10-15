import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { Authorization } from "@/components/Authorization";

import { usePosts } from "@/queries";

import { CreatePost } from "../components/CreatePost";
import { DeletePost } from "../components/DeletePost";

export const Posts = () => {
  const posts = usePosts();

  if (posts.data === undefined) return null;

  return (
    <>
      <Authorization>
        <CreatePost />
      </Authorization>
      {posts.data.map((post) => (
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>
              <>
                <Link to={`${post.id}`}>{post.title}</Link>, Author:{" "}
                {post.author.username}, At: {post.createdAt}
              </>
            </Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Authorization owner={post.author.id}>
              <DeletePost id={post.id} />
            </Authorization>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
