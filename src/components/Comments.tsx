import React, { useState } from "react";
import Comment from "./Comment";

const commentsArr = [
  {
    id: 1,
    title:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    replies: [
      {
        id: 1,
        title:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      },
    ],
  },
  {
    id: 2,
    title:
      "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    replies: [
      {
        id: 1,
        title:
          "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      },
    ],
  },
];

export default function Comments() {
  const [comments, setComments] = useState(commentsArr);
  const [commentTitle, setCommentTitle] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lastId = comments[comments.length - 1]?.id || 0;
    const newComment = {
      id: lastId + 1,
      title: commentTitle,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((el) => el.id !== id));
  };

  const handleEdit = (index:number,title:string) => {
    const copyComments = [...comments]
    copyComments[index] = {...copyComments[index],title}
    setComments(copyComments)

  }

  const handleReply = (index:number,replytitle:string) => {
    const copyComments = [...comments]
    const lastId = copyComments[index].replies[copyComments[index].replies.length - 1]?.id || 0
    const newReply = {
        id:lastId + 1,
        title:replytitle
    }
    copyComments[index].replies = [...copyComments[index].replies,newReply]
    setComments(copyComments)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Comment"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
        <button>Add Comment</button>
      </form>
      {comments.map((el, index) => (
        <Comment
         key={el.id}
         el={el}
         index={index} 
         handleDelete = {handleDelete}
         handleEdit = {handleEdit}
         handleReply = {handleReply}
          />
      ))}
    </div>
  );
}
