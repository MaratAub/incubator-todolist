import {v1} from 'uuid';
import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {AddItemForm} from "./Components/AddItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Container, createTheme,
  CssBaseline,
  Grid,
  Paper, Switch,
  ThemeProvider
} from "@mui/material";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./Components/NavButton.ts";
import { deepOrange } from '@mui/material/colors';

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

type TasksType = {
  [key: string]: TaskType[]
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type FilterValues = 'All' | 'Completed' | 'Active'

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
  });
  //CRUD Todolist
  const changeFilter = (todolistId: Todolist['id'], filter: FilterValues) => {
    setTodolists(prevState => prevState.map(tl => tl.id === todolistId ? {
      ...tl,
      filter
    } : tl))
  }

  const removeTodolist = (todolistId: Todolist['id']) => {
    setTodolists(prevState => prevState.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    // setTasks(({...tasks}))
  }

  const createTodolist = (title: Todolist['title']) => {
    const id = v1()
    const newTodolist: Todolist = {id, title, filter: 'All'}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [id]: []})
  }

  const updateTodolistTitle = (todolistId: Todolist['id'], updatedTitle: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {
      ...tl,
      title: updatedTitle
    } : tl))
  }

  //CRUD Task
  const removeTask = (todolistId: Todolist['id'], taskId: TaskType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    });
  }

  const createTask = (todolistId: Todolist['id'], title: TaskType['title']) => {
    const newTask: TaskType = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  const changeTaskStatus = (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {
        ...t,
        isDone
      } : t)
    })
  }

  const updateTaskTitle = (todolistId: Todolist['id'], taskId: TaskType['id'], updatedTitle: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {
        ...t,
        title: updatedTitle
      } : t)
    })
  }

  const todolistsComponents = todolists.map(tl => {
    let filteredTasks = tasks[tl.id]

    if (tl.filter === 'Completed') {
      filteredTasks = tasks[tl.id].filter(el => el.isDone)
    }
    if (tl.filter === 'Active') {
      filteredTasks = tasks[tl.id].filter(el => !el.isDone)
    }
    return (
      <Grid key={tl.id}>
        <Paper
          elevation={5}
          sx={{p: '15px'}}
        >
          <TodolistItem
            todolistId={tl.id}
            todolist={tl}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            updateTaskTitle={updateTaskTitle}
            updateTodolistTitle={updateTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  })

  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: {
        main: '#33c6dc',
      },
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="static">
          <Toolbar sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <Switch onChange={() => setDarkMode(!darkMode)}/>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg'>
          <Grid
            container
            sx={{p: '15px 0'}}
          >
            <AddItemForm addItem={createTodolist} />
          </Grid>
          <Grid
            container
            spacing={5}
          >
            {todolistsComponents}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
