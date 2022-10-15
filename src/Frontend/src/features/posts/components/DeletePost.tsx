import { useDeletePost } from "@/queries";
import { Button } from "react-bootstrap";

type DeletePostProps = {
  id: string;
};

export const DeletePost = (props: DeletePostProps) => {
  const deletePost = useDeletePost(props.id);

  const clicked = async () => {
    await deletePost.mutateAsync(props.id);
  };

  return <Button onClick={clicked}>Delete</Button>;
};
