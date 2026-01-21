import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';


type AddItemFormProps = {
  addItem: (title: string) => void,
}

export const AddItemForm = ({addItem}: AddItemFormProps) => {

  const [itemTitle, setItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    const trimmedInputValue = itemTitle.trim();
    if (trimmedInputValue !== '') {
      addItem(trimmedInputValue)
      setItemTitle("");
    } else {
      setError('Enter valid title');
    }
  }

  const addItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
    setError(null);
  }

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        value={itemTitle}
        error={!!error}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={addItemOnEnterHandler}
      />
      <IconButton
        onClick={addItemHandler}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};

