import { PostCreateModel, useUpdatePost, usePost } from "@/queries";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

type EditPostProps = {
  id: string;
};

export const EditPost = (props: EditPostProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const post = usePost(props.id);

  const [form, setForm] = useState<PostCreateModel>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (post.data !== undefined)
      setForm({
        title: post.data.title,
        content: post.data.content,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePost = useUpdatePost(props.id);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await updatePost.mutateAsync(form);
    setShow(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Button onClick={handleShow}>Edit</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
