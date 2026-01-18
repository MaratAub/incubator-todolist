import {Button} from "./Components/Button.tsx";
import {Task} from "./Task.tsx";
import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type Props = {
  id:Todolist['id']
  todolist: Todolist
  tasks: TaskType[],
  removeTask:(todolistId:Todolist['id'], taskId:TaskType['id']) => void,
  changeFilter:(todolistId:Todolist['id'], filter:FilterValues)=>void,
  createTask:(todolistId:Todolist['id'], title:TaskType['title']) => void,
  changeTaskStatus:(todolistId:Todolist['id'], taskId:TaskType['id'], isDone:TaskType['isDone']) => void
  removeTodolist:(todolistId:Todolist['id']) => void
}

export const TodolistItem = (Props: Props) => {
  const {
    id,
    todolist: {title, filter},
    tasks,
    removeTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    removeTodolist} = Props


  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    const trimmedInputValue = inputValue.trim();
    if(trimmedInputValue !== ''){
      createTask(id, trimmedInputValue)
      setInputValue("");
    }else{
      setError('Title is required');
    }
  }

  const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      createTaskHandler()
    }
  }

  const changeInputValueHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    setError(null);
  }

  const changeFilterHandler = (filter:FilterValues) => {
    changeFilter(id, filter);
  }

  //const inputRef = useRef<HTMLInputElement>(null);
  // const createTaskHeandler = () => {
  //   if(inputRef.current) {
  //     createTask(inputRef.current.value)
  //     inputRef.current.value = "";
  //   }
  // }

  const removeTodolistHandler = () => {
    removeTodolist(id)
  }

  return (
    <div>
      <h3>
        {title}
        <Button title={'X'} onClick={removeTodolistHandler}/>
      </h3>
      <div>
        <input value={inputValue}
               className={error ? 'error' : ''}
               onChange={changeInputValueHandler}
               onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={'+'} onClick={createTaskHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <div>Тасок нет</div>
      ) : (
        <ul>
          <Task tasks={tasks}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                todolistId={id}
          />
        </ul>
      )
      }
      <div>
        <Button className={filter === 'All' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilterHandler('All')}/>
        <Button className={filter === 'Active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilterHandler('Active')}/>
        <Button className={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilterHandler('Completed')}/>
      </div>
    </div>
  );
};

