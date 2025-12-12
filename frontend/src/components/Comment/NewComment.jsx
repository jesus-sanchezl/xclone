import PropTypes from "prop-types";

import { createCommentService } from "../../services/comment/commentServices";

import { CommentForm } from "../Comment/CommentForm";

export const NewComment = ({ addComment, tweetId }) => {
    const handleAddCommentSubmit = async ({ data, token }) => {
        const response = await createCommentService({ tweetId, data, token });

        return response;
    };

    return <CommentForm onSubmit={handleAddCommentSubmit} onAdd={addComment} />;
};

NewComment.propTypes = {
    addComment: PropTypes.func,
    tweetId: PropTypes.string,
};
