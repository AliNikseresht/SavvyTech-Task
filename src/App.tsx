import { Toaster } from "sonner";
import Layout from "./layout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        richColors={true}
        style={
          {
            "--success-bg": "#16A34A",
            "--success-text": "#F9FAFB",
            "--error-bg": "#DC2626",
            "--error-text": "#F9FAFB",
          } as React.CSSProperties
        }
      />
      <main>
        <Layout />
      </main>
    </QueryClientProvider>
  );
}
