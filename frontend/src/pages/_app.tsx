import { AuthProvider } from "@/providers/AuthProvider";
import RouteControl from "@/providers/RouteControl";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { chewy, poppins } from "../../public/font";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteControl>
        <style jsx global>{`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}</style>
        <div className={`${poppins.variable} ${chewy.variable}`}>
          <Component {...pageProps} />
        </div>
      </RouteControl>
      <Toaster />
    </AuthProvider>
  );
}
