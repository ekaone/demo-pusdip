import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Account({ session }) {
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
    <div className="form-control max-w-2xl mx-auto">
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
        <button
          className="btn btn-primary mx-5"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
