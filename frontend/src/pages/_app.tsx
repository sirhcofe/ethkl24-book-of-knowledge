import { AuthProvider } from "@/providers/AuthProvider";
import RouteControl from "@/providers/RouteControl";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteControl>
        <Component {...pageProps} />
      </RouteControl>
      <Toaster />
    </AuthProvider>
  );
}
