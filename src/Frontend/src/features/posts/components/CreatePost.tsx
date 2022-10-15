import React from "react";
import { Form, Button, Card } from "react-bootstrap";

import { PostCreateModel, useCreatePost } from "@/queries";
import { useState } from "react";

export const CreatePost = () => {
  const createPost = useCreatePost();

  const [form, setForm] = useState<PostCreateModel>({
    title: "",
    content: "",
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await createPost.mutateAsync(form);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              value={form.title}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              name="content"
              as="textarea"
              placeholder="Enter content"
              value={form.content}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Create post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
