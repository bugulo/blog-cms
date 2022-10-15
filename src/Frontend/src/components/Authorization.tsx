import React from "react";

import { useAuth } from "@/stores/auth";

type AuthorizationProps = {
  owner?: string;
  children: React.ReactNode;
};

export const Authorization = (props: AuthorizationProps) => {
  const auth = useAuth();

  if (!auth.isLogged) return null;

  if (props.owner !== undefined && props.owner !== auth.user.id) return null;

  return <>{props.children}</>;
};
