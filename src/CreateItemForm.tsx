import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {IconButton, TextField} from "@mui/material";

type Props = {
  createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}:Props) => {

  const [itemTitle, setItemTitle] = useState('')
  const [error, setError] = useState<boolean>(false)

  const createItemHandler = () => {
    const trimmedTitle = itemTitle.trim()
    if (trimmedTitle !== '') {
      createItem(trimmedTitle)
      setItemTitle('')
    }else{
      setError(true)
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
    setError(false)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        error={error}
        helperText={error && 'Enter valid title'}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        size='small'
      />
      <IconButton onClick={createItemHandler}>
        <AddBoxOutlinedIcon/>
      </IconButton>
    </div>
  );
};

