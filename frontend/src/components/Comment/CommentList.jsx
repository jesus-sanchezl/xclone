import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { CommentWrapper } from "./CommentWrapper";

export const CommentList = ({ comments, removeComment, toggleLikeComment }) => {
    return comments?.length ? (
        <Box component="ul" sx={{ listStyle: "none", margin: 0, padding: 0 }}>
            {comments.map((comment) => (
                <Box
                    key={comment.commentId}
                    component="li"
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: "100%",
                    }}
                >
                    <CommentWrapper
                        comment={comment}
                        removeComment={removeComment}
                        toggleLikeComment={toggleLikeComment}
                    />
                </Box>
            ))}
        </Box>
    ) : (
        <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 2 }}
        >
            Esta publicación no tiene comentarios
        </Typography>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array,
    removeComment: PropTypes.func,
    toggleLikeComment: PropTypes.func,
};
