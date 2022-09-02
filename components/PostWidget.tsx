import moment from "moment";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getRecentPosts, getSimilarPosts } from "../services";

interface PostWidgetProps {
    categories: any;
    slug: any;
}

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) =>
                setRelatedPosts(result)
            );
        } else {
            getRecentPosts().then((result) => setRelatedPosts(result));
        }
    }, [slug]);

    return (
        <div className="bg-white shadow-lg rounded-md p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? "Related Posts" : "Recent Posts"}
            </h3>
            {relatedPosts.map((post: any) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            width="60px"
                            height="60px"
                            className="align-middle rounded-full"
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-md"
                            key={post.title}
                        >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
