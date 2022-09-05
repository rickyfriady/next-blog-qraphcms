import { useRef, useState, useEffect } from "react";

import { submitComment } from "../services";

interface CommentsFormProps {
    slug: any;
}

const CommentsForm = ({ slug }: CommentsFormProps) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const CommentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDatatEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem("name");
        emailEl.current.value = window.localStorage.getItem("email");
    }, []);

    const handleCommentsSubmission = () => {
        setError(false);

        const { value: comment } = CommentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDatatEl.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }
        const commentObj = { name, email, comment, slug };

        if (storeData) {
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("email", emailEl);
        } else {
            window.localStorage.removeItem("name");
            window.localStorage.removeItem("email");
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Leave a reply
            </h3>
            <div className="grid  grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={CommentEl}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="type something for comment"
                    name="comment"
                ></textarea>
            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="type your name"
                    name="name"
                />
                <input
                    type="text"
                    ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="email"
                    name="email"
                />
            </div>
            <div className="grid  grid-cols-1 gap-4 mb-4">
                <div>
                    <input
                        ref={storeDatatEl}
                        type="checkbox"
                        name="storeData"
                        id="storeData"
                        value="true"
                    />
                    <label
                        className="text-gray-500 cursor-pointer ml-2"
                        htmlFor="storeData"
                    >
                        Save my email and name for the next time i comments.
                    </label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">All Field is Reduired </p>
            )}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleCommentsSubmission}
                    className="transition duration-500 ease hover:bg-indigo-500 inline-block bg-pink-600 rounded-full text-white px-8 py-3  cursor-pointer"
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="text-xl float-right font-semibold mt-3 text-green-500">
                        Commment submitted for review
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
