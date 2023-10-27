import { dbService } from "fbase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NweetTextRef, {
        text: newNweet,
    });
  }   
  
  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value)
  }

  return (
    <div>
        {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        placeholder="수정할 내용을 작성하세요." 
                        value={newNweet}
                        onChange={onChange}
                        required 
                    />
                    <input type="submit" value="Update" />
                </form>
                <button onClick={toggleEditing}>닫기</button>
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
            )}
            </>
        )}
    </div>
  );
};
export default Nweet;
