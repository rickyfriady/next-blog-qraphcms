import { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

interface CommentsProps {
    slug: any;
}

const Comments = ({ slug }: CommentsProps) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => setComments(result));
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length}
                        {""}
                        Comments
                    </h3>
                    {comments.map((comment) => (
                        <div
                            key={comment.createdAt}
                            className="borde-b border-gray-100 mb-4 pb-4"
                        ></div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;
