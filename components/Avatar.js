import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full">
        <div className="grid h-20 place-items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="avatar image"
              style={{ height: size, width: size }}
            />
          ) : (
            <div
              className="avatar no-image"
              style={{ height: size, width: size }}
            />
          )}
        </div>
        <div className="divider"></div>
        <div className="grid h-20 place-items-center">
          <label className="button primary block" htmlFor="single">
            {uploading ? "Uploading ..." : ""}
          </label>
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
            className="file-input input-bordered mt-10"
          />
        </div>
      </div>
    </div>
  );
}
