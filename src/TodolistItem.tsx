import {Task} from "./Task.tsx";
import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {Box, Button, List, Typography} from "@mui/material";
import {containerSx} from "./TodolistItem.styles.ts";
import {ItemTitle} from "./ItemTitle.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

type Props = {
  todolistId: Todolist['id']
  todolist: Todolist
  tasks: TaskType[],
  removeTask: (todolistId: Todolist['id'], taskId: TaskType['id']) => void,
  changeFilter: (todolistId: Todolist['id'], filter: FilterValues) => void,
  createTask: (todolistId: Todolist['id'], title: TaskType['title']) => void,
  changeTaskStatus: (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => void
  removeTodolist: (todolistId: Todolist['id']) => void
  changeTaskTitle: (todolistId: Todolist['id'], taskId: TaskType['id'], updatedTitle: string) => void
  updateTodolistTitle: (todolistId: Todolist['id'], updatedTitle: string) => void
}

export const TodolistItem = (Props: Props) => {
  const {
    todolistId,
    todolist: {title, filter},
    tasks,
    removeTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    removeTodolist,
    changeTaskTitle,
    updateTodolistTitle
  } = Props


  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(todolistId, filter);
  }


  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const createTaskHandler = (title: string) => {
    createTask(todolistId, title)
  }

  const changeTodolistTitleHandler = (title: string) => {
    updateTodolistTitle(todolistId, title)
  }


  return (
    <div>
      <Typography variant='h5' sx={{display:'flex', justifyContent:'space-between',fontWeight:"bold"}}>
        <ItemTitle title={title}
                   changeTitle={(title:string) => changeTodolistTitleHandler(title)}
                   deleteItem={removeTodolistHandler}/>
      </Typography>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <Box sx={{padding:'5px 0'}}>Добавьте задачу</Box>
      ) : (
        <List>
          <Task
            tasks={tasks}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            todolistId={todolistId}
            changeTaskTitle={changeTaskTitle}
          />
        </List>
      )
      }
      <Box sx={containerSx}>
        <Button
          size='small'
          color={filter === 'All' ? 'secondary' : 'primary'}
          variant='contained'
          onClick={() => changeFilterHandler('All')}
        >All</Button>
        <Button
          size='small'
          color={filter === 'Active' ? 'secondary' : 'primary'}
          variant='contained'
          onClick={() => changeFilterHandler('Active')}
        >Active</Button>
        <Button
          size='small'
          color={filter === 'Completed' ? 'secondary' : 'primary'}
          variant='contained'
          onClick={() => changeFilterHandler('Completed')}
        >Completed</Button>
      </Box>
    </div>
  );
};

