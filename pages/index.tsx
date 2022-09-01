import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PostCard, PostWidget, Categories } from "../components";

const Posts = [
  { title: "React Testing", excerpt: "Learn React testing" },
  { title: "React With Tailwind", excerpt: "Learn React With Tailwind" },
];

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>Blog CMS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {Posts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
