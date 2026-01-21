//import {Button} from "./Components/Button.tsx";
import {Task} from "./Task.tsx";
import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {AddItemForm} from "./Components/AddItemForm.tsx";
import {EditableSpan} from "./Components/EditableSpan.tsx";
import {Box, Button, IconButton, List} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {containerSx} from "./TodolistItem.styles.ts";

type Props = {
  todolistId: Todolist['id']
  todolist: Todolist
  tasks: TaskType[],
  removeTask: (todolistId: Todolist['id'], taskId: TaskType['id']) => void,
  changeFilter: (todolistId: Todolist['id'], filter: FilterValues) => void,
  createTask: (todolistId: Todolist['id'], title: TaskType['title']) => void,
  changeTaskStatus: (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => void
  removeTodolist: (todolistId: Todolist['id']) => void
  updateTaskTitle: (todolistId: Todolist['id'], taskId: TaskType['id'], updatedTitle: string) => void
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
    updateTaskTitle,
    updateTodolistTitle
  } = Props


  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(todolistId, filter);
  }

  //const inputRef = useRef<HTMLInputElement>(null);
  // const createTaskHeandler = () => {
  //   if(inputRef.current) {
  //     createTask(inputRef.current.value)
  //     inputRef.current.value = "";
  //   }
  // }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const createTaskHandler = (title: string) => {
    createTask(todolistId, title)
  }

  const updateTodolistTitleHandler = (title: string) => {
    updateTodolistTitle(todolistId, title)
  }


  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={title}
          onClick={updateTodolistTitleHandler}
        />
        <IconButton onClick={removeTodolistHandler}>
          <DeleteOutlineIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <div>Тасок нет</div>
      ) : (
        <List>
          <Task
            tasks={tasks}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            todolistId={todolistId}
            updateTaskTitle={updateTaskTitle}
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

