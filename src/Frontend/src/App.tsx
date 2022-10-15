import { useEffect } from "react";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { queryClient } from "./lib/react-query";

import { DefaultLayout } from "@/components/Layouts";
import { Notifications } from "@/components/Notifications/Notifications";

import { AuthRoutes } from "@/features/auth";
import { PostsRoutes } from "@/features/posts";

import { useAuth } from "@/stores/auth";

import "bootstrap/dist/css/bootstrap.min.css";

export const App = () => {
  const auth = useAuth();

  // Refresh auth status on application launch to check if there is logged user
  useEffect(() => {
    auth.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            <Route path="*" element={<PostsRoutes />} />
            <Route path="auth/*" element={<AuthRoutes />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
