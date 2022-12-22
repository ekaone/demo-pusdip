import "../styles/globals.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

function MyApp({ Component, pageProps, router }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.asPath} />;
      </AnimatePresence>
    </SessionContextProvider>
  );
}
export default MyApp;
