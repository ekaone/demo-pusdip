import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
import { photos } from "../data/photos";

export default function Home() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  return (
    <Layout>
      <div className="p-2 flex justify-center">
        <button
          className="btn btn-primary mx-5"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
        <button
          className="btn btn-primary mx-5"
          onClick={() => router.push("/account")}
        >
          User
        </button>
      </div>
      <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {photos.map((photo) => (
          <Link href={`/photo/${photo.id}`} scroll={false} key={photo.id}>
            <a className="overflow-hidden flex rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl hover:z-10 transition-all ease-in-out">
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    placeholder="blur"
                    blurDataURL={photo.placeholder}
                    width={photo.width}
                    height={photo.height}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{photo.title}</h2>
                  <p>{photo.author}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Details</button>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
