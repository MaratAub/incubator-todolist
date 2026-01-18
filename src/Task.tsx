import {TaskType, Todolist} from "./App.tsx";
import {Button} from "./Components/Button.tsx";
import {ChangeEvent} from "react";


type Props = {
  tasks: TaskType[];
  removeTask:(todolistId:Todolist['id'], taskId:TaskType['id']) => void;
  changeTaskStatus:(todolistId:Todolist['id'], taskId:TaskType['id'], isDone:TaskType['isDone']) => void;
  todolistId:Todolist['id'];
}


export const Task = ({tasks, removeTask, changeTaskStatus, todolistId}: Props) => {



  return (
    <>
      {
        tasks.map(t => {

          const removeTaskHandler = () => {
            removeTask(todolistId, t.id)
          }

          const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(todolistId, t.id, newStatusValue)
          }

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/><span>{t.title}</span>
              <Button title={"X"} onClick={removeTaskHandler}/>
            </li>
          )
        })
      }
    </>
  );
};

