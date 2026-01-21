import {TaskType, Todolist} from "./App.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "./Components/EditableSpan.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Box, Checkbox, IconButton, ListItem} from "@mui/material";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";


type Props = {
  tasks: TaskType[];
  removeTask:(todolistId:Todolist['id'], taskId:TaskType['id']) => void;
  changeTaskStatus:(todolistId:Todolist['id'], taskId:TaskType['id'], isDone:TaskType['isDone']) => void;
  todolistId:Todolist['id'];
  updateTaskTitle:(todolistId:Todolist['id'], taskId:TaskType['id'], updatedTitle:string) => void
}


export const Task = (Props: Props) => {

  const {
    tasks,
    removeTask,
    changeTaskStatus,
    todolistId,
    updateTaskTitle} = Props


  const updateTaskTitleHandler = (taskId:string, updateTitle:string) => {
    updateTaskTitle(todolistId, taskId, updateTitle)
  }


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
            <ListItem disablePadding sx={containerSx} key={t.id}>
              <Box sx={getListItemSx(t.isDone)}>
                <Checkbox size='small' checked={t.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={t.title} onClick={(updateTitle:string) => updateTaskTitleHandler(t.id, updateTitle)}/>
              </Box>
              <IconButton
                size='small'
                onClick={removeTaskHandler}
              >
                <DeleteOutlineIcon/>
              </IconButton>
            </ListItem>
          )
        })
      }
    </>
  );
};

