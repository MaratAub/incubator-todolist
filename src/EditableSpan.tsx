import {useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import {IconButton, TextField} from "@mui/material";

type Props = {
  title: string,
  changeTitle: (newTitle: string) => void,
  editMode: boolean,
  offEditMode: () => void,
}

export const EditableSpan = ({title, changeTitle, editMode, offEditMode}:Props) => {

  const [editableTitle, setEditableTitle] = useState<string>(title)

  const offEditModeHandler = () => {
    offEditMode()
    changeTitle(editableTitle)
  }

  return (
    editMode
      ? <>
        <TextField
          autoFocus
          onBlur={offEditModeHandler}
          value={editableTitle}
          onChange={(e) => setEditableTitle(e.currentTarget.value)}
          size="small"
          variant='standard'
        />
        <IconButton onClick={offEditMode}>
          <CheckIcon/>
        </IconButton>
      </>
      : <span>{title}</span>
  );
};
