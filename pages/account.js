import { useState, useEffect } from "react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";

export default function Account() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    if (!session) {
      return;
    }

    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!session ? (
        <div className="max-w-2xl mx-auto">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      ) : (
        <Layout>
          <div className="sticky top-10 p-10 mx-auto">
            <Link href="/">
              <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                Back
              </a>
            </Link>
          </div>
          <div className="form-widget">
            <Avatar
              uid={user.id}
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ username, website, avatar_url: url });
              }}
            />
          </div>
          <div className="p-10 max-w-2xl mx-auto">
            <div>
              <label className="input-group">
                <span>Email</span>
                <input
                  id="email"
                  type="text"
                  value={session.user.email}
                  disabled
                  className="input w-full"
                />
              </label>
            </div>
            <div className="mt-6">
              <label className="input-group">
                <span>Username</span>
                <input
                  id="username"
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-full input-bordered"
                />
              </label>
            </div>
            <div className="mt-6">
              <label className="input-group">
                <span>Website</span>
                <input
                  id="website"
                  type="website"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="input w-full input-bordered"
                />
              </label>
            </div>

            <div className="mt-6">
              <button
                className="btn btn-primary"
                onClick={() => updateProfile({ username, website, avatar_url })}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update"}
              </button>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
