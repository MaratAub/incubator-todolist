import {TaskType, Todolist} from "./App.tsx";
import {ChangeEvent} from "react";
import {Checkbox, ListItem} from "@mui/material";
import {getListItemSx} from "./TodolistItem.styles.ts";
import {ItemTitle} from "./ItemTitle.tsx";


type Props = {
  tasks: TaskType[];
  removeTask:(todolistId:Todolist['id'], taskId:TaskType['id']) => void;
  changeTaskStatus:(todolistId:Todolist['id'], taskId:TaskType['id'], isDone:TaskType['isDone']) => void;
  todolistId:Todolist['id'];
  changeTaskTitle:(todolistId:Todolist['id'], taskId:TaskType['id'], updatedTitle:string) => void
}


export const Task = (Props: Props) => {

  const {
    tasks,
    removeTask,
    changeTaskStatus,
    todolistId,
    changeTaskTitle} = Props



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
            <ListItem disablePadding sx={{display:'flex', width:'100%'}} key={t.id}>
                <Checkbox size='small' checked={t.isDone} onChange={changeTaskStatusHandler}/>
                <ItemTitle title={t.title}
                           changeTitle={(title) => changeTaskTitle(todolistId, t.id, title)}
                           deleteItem={removeTaskHandler}
                           sx={getListItemSx(t.isDone)}
                />
            </ListItem>
          )
        })
      }
    </>
  );
};

