import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, PostWidget, Categories } from "../components";
import { getPosts } from "../services";
import { FeaturedPost } from "../sections";

const Home: NextPage = ({ posts }: any) => {
    return (
        <div className="container mx-auto px-10 mb-8 ">
            <Head>
                <title>Blog CMS App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FeaturedPost />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post: any) => (
                        <PostCard post={post.node} key={post.title} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="lg:sticky relative top-8">
                        <PostWidget categories={undefined} slug={undefined} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};
export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    return {
        props: { posts },
    };
}

export default Home;
