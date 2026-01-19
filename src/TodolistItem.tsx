import {Button} from "./Components/Button.tsx";
import {Task} from "./Task.tsx";
import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {AddItemForm} from "./Components/AddItemForm.tsx";


type Props = {
  todolistId:Todolist['id']
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
    todolistId,
    todolist: {title, filter},
    tasks,
    removeTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    removeTodolist} = Props


  const changeFilterHandler = (filter:FilterValues) => {
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


  const createTaskHandler = (title:string) => {
    createTask(todolistId, title)
  }
  return (
    <div>
      <h3>
        {title}
        <Button title={'X'} onClick={removeTodolistHandler}/>
      </h3>
      <AddItemForm addItem={createTaskHandler}/>
      {tasks.length === 0 ? (
        <div>Тасок нет</div>
      ) : (
        <ul>
          <Task tasks={tasks}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                todolistId={todolistId}
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

