import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
  addItem:(title:string) => void,
}

export const AddItemForm = ({addItem}:AddItemFormProps) => {

  const [itemTitle, setItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    const trimmedInputValue = itemTitle.trim();
    if(trimmedInputValue !== ''){
      addItem(trimmedInputValue)
      setItemTitle("");
    }else{
      setError('Title is required');
    }
  }

  const addItemOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addItemHandler()
    }
  }

  const changeItemTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
    setError(null);
  }

  return (
    <div>
      <input value={itemTitle}
             className={error ? 'error' : ''}
             onChange={changeItemTitleHandler}
             onKeyDown={addItemOnEnterHandler}
      />
      <Button title={'+'} onClick={addItemHandler}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};

