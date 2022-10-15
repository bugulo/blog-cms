import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

import { Authorization } from "@/components/Authorization";

import { usePost } from "@/queries";

import { DeletePost } from "../components/DeletePost";
import { EditPost } from "../components/EditPost";

type PostParams = {
  id: string;
};

export const Post = () => {
  const params = useParams<PostParams>();

  const post = usePost(params.id!);

  if (post.data === undefined) return null;

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <>
            {post.data.title}
            by {post.data.author.username}
            at {post.data.createdAt}
          </>
        </Card.Title>
        <Card.Text>{post.data.content}</Card.Text>
        <Authorization owner={post.data.author.id}>
          <DeletePost id={post.data.id} />
          <EditPost id={post.data.id} />
        </Authorization>
      </Card.Body>
    </Card>
  );
};
