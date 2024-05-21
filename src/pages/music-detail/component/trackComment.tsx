import { useState } from "react";
import { Button } from "react-bootstrap";

interface Comment {
  id?: string;
  text: string;
  author: string;
  comments: Array<Comment>;
}
interface CommentInputProps {
  onSubmitComment: (newComment: Comment) => void;
}
interface CommentItemProps {
  comment: Comment;
}
const dummyComment: Comment[] = [
  {
    id: "1",
    text: "adfsadfs 1",
    author: "mrA",
    comments: [],
  },
  {
    id: "2",
    text: "adfsadfs 2",
    author: "mrA",
    comments: [
      {
        id: "4",
        text: "nestd 1st",
        author: "nested",
        comments: [],
      },
    ],
  },
  {
    id: "3",
    text: "adfsadfs 3",
    author: "mrA",
    comments: [],
  },
];
const CommentInput = ({ onSubmitComment }: CommentInputProps) => {
  const [inputText, setInputText] = useState("");
  return (
    <>
      <textarea
        placeholder="comments here"
        className="border border-secondary p-3 m-2 mb-0 mt-0 "
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      ></textarea>
      <Button
        className="align-self-start ms-2 mb-3 mt-2 "
        onClick={() => {
          onSubmitComment({ text: inputText, comments: [], id: "", author: "a" });
          setInputText("");
        }}
      >
        comment
      </Button>
      {/* onClick={(event) => onSubmitComment()} */}
    </>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState(dummyComment);
  const onSubmitComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };
  return (
    <>
      <div className="d-flex flex-column flex-wrap  gap-3 overflow-scroll ">
        <span>nested comment</span>
        <div className="">
          <CommentInput onSubmitComment={onSubmitComment} />
        </div>
        <div className="d-flex flex-column gap-3 ">
          {comments.map((comment, index) => {
            return (
              <>
                <CommentItem comment={comment}></CommentItem>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export const TrackComments = CommentSection;

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [comments, setComments] = useState(comment.comments);
  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setIsReplying(false);
    setIsShowComments(true);
  };
  return (
    <>
      <div
        className=" d-flex flex-column p-3 ms-3 "
        style={{ maxWidth: "1000px", minWidth: "800px" }}
      >
        <div className="border border-secondary ">
          <p>{comment.author}</p>
          <div className="ms-2 me-2 text-break border border-primary ">{comment.text}</div>
          <Button
            className="ms-2 me-2 align-self-start m-2 "
            onClick={(event) => {
              setIsReplying(!isReplying);
            }}
          >
            reply
          </Button>
          <Button onClick={(event) => setIsShowComments(!isShowComments)}>show comment</Button>
          {isReplying && (
            <>
              <div className="align-self-start d-flex  flex-column ">
                <CommentInput onSubmitComment={onComment} />
              </div>
            </>
          )}
        </div>
        {comments.map((comment) => (
          <div className={isShowComments ? "d-none " : ""}>
            <CommentItem comment={comment} />
          </div>
        ))}
        {/* {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))} */}
      </div>
    </>
  );
};
