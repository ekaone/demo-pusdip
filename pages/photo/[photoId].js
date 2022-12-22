import {
  ArrowSmallLeftIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CameraIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoremIpsum } from "react-lorem-ipsum";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import Layout from "../../components/Layout";
import { photos } from "../../data/photos";

const PhotoDetail = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [photo, setPhoto] = useState();
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    photoId && setPhoto(photos[photoId]);
  }, [photoId]);

  if (!photo) {
    return null;
  }

  return (
    <>
      {!session ? (
        <div className="max-w-2xl mx-auto">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      ) : (
        <Layout>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] min-h-screen">
            <div className="p-10">
              <div className="sticky top-10">
                <motion.div
                  className="flex justify-between mb-8"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  <Link href="/">
                    <a className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group">
                      <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
                      Back
                    </a>
                  </Link>
                  <a
                    href={photo.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-purple-600 text-sm tracking-tight font-medium focus:outline-0 focus:ring-2 focus:ring-purple-400 group"
                  >
                    View Source
                    <ArrowUpRightIcon className="w-4 h-4 text-gray-400 ml-2 group-hover:text-purple-400" />
                  </a>
                </motion.div>
                <motion.h2
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                  }}
                  className="text-4xl font-bold tracking-tight"
                >
                  {photo.title}
                </motion.h2>
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                  }}
                  className="mt-5 text-sm text-gray-600 space-y-2"
                >
                  <p className="flex items-center">
                    <CameraIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {photo.author}
                  </p>
                  <p className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {photo.location}
                  </p>
                  <p className="flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-purple-500" />
                    {photo.date}
                  </p>
                  <p className="flex items-center">
                    <CurrencyDollarIcon className="w-4 h-4 mr-2 text-purple-500" />
                    $ {photo.price}
                  </p>
                  <p>
                    <button
                      className="btn btn-primary btn-sm"
                      // onClick={() => router.push("/chart/" + photo.id)}
                      onClick={() => alert("Sukses Melakukan Pembelian")}
                    >
                      Buy
                    </button>
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.8,
                  }}
                  className="mt-5 text-sm text-gray-500 space-y-5"
                >
                  <LoremIpsum p={2} />
                </motion.div>
              </div>
            </div>
            <div className="overflow-hidden flex">
              <Image
                src={photo.src}
                alt={photo.title}
                placeholder="blur"
                blurDataURL={photo.placeholder}
                width={photo.width}
                height={photo.height}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};
export default PhotoDetail;
