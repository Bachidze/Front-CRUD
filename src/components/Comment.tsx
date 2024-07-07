import { useState } from "react";

type PropType = {
  el: {
    id: number;
    title: string;
    replies: {
      id: number;
      title: string;
    }[];
  };
  index: number;
  handleDelete: (id: number) => void;
  handleEdit: (index: number, title: string) => void
  handleReply: (index: number, replytitle: string) => void
};
export default function Comment({ el, index, handleDelete,handleEdit,handleReply }: PropType) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(el.title);
  const [isReply, setIsReply] = useState(false);
  const [replyTxt, setReplyTxt] = useState('');
  return (
    <>
      {isEdit ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={() => {
            handleEdit(index,editTitle)
            setIsEdit(false)
          }}>Save</button>
          <button onClick={() => setIsEdit(false)}>Cancle</button>
        </div>
      ) : (
        <div key={el.id}>
          <h2>{el.title}</h2>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={() => handleDelete(el.id)}>delete</button>
          <button onClick={() =>setIsReply(true)}>Reply</button>
        </div>
      )}
      {
        isReply && 
        <div>
            <input type="text" value={replyTxt} onChange={(e) => setReplyTxt(e.target.value)} />
            <button onClick={() => {
                handleReply(index,replyTxt)
                setIsReply(false)
            }}>Add</button>
            <button onClick={() => setIsReply(false)}>Cancle</button>
        </div>
      }
      {el.replies.map(el => (
        <div key={el.id} style={{border:"2px solid red"}}>
            <h3>{el.title}</h3>
        </div>
      ))}
    </>
  );
}
