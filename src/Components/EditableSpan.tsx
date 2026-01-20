import {ChangeEvent, useState} from "react";

type Props = {
  oldTitle: string,
  onClick: (updateTitle: string) => void,
}

export const EditableSpan = ({oldTitle, onClick}: Props) => {
  const [edit, setEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(oldTitle);


  const editHandler = () => {
    setEdit(!edit);
    if(edit){
      onClick(updateTitle);
    }
  }

  const updateTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(event.currentTarget.value);
  }

  return (
    edit
      ? <input
        value={updateTitle}
        autoFocus
        onBlur={editHandler}
        onChange={updateTitleHandler}
      />
      : <span onDoubleClick={editHandler}>{oldTitle}</span>
  );
};

