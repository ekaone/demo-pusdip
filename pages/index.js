import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
// import Account from "../components/Account";
import Landing from "../components/Landing";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout>
      <div className="p-10">
        {!session ? (
          <div className="max-w-2xl mx-auto">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div>
        ) : (
          <>
            {/* <Account session={session} /> */}
            <Landing />
          </>
        )}
      </div>
    </Layout>
  );
}
