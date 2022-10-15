import { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/stores/auth";

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      await auth.login(form);
      navigate("/");
    } catch (e) {
      setError("Failed to login");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {error !== "" && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={onChange}
        />
      </Form.Group>
      <hr></hr>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Link to="../register">
        <Button variant="success" className="ms-1">
          Create account
        </Button>
      </Link>
    </Form>
  );
};
