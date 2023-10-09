import React, {useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {amber, teal} from "@mui/material/colors";
import {Brightness4Outlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./redux/todolists-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksForTodolistType = {
    [key: string]: TaskType[]
}


export const App = React.memo(() => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksForTodolistType>(state => state.tasks)


    const [lightMode, setLightMode] = useState(true)
    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
            mode: lightMode ? 'light' : "dark"
        },
    });
    const setDarkMode = () => {
        setLightMode(!lightMode)
    }

    // CRUD tasks
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    },[dispatch])
    const changeTaskTitle = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(title, taskId, todolistId))
    },[dispatch])

    // CRUD todolists
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title, v1()))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position="static">
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h4">Todolist</Typography>
                        <div>
                            <Button
                                sx={{mr: '20px'}}
                                variant={'outlined'}
                                color={'inherit'}
                                onClick={setDarkMode}
                                endIcon={<Brightness4Outlined/>}>

                                {lightMode ? "Dark mode" : 'Light mode'}

                            </Button>
                            <Button variant={'outlined'} color={'inherit'}>
                                LogOut
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '20px', justifyContent: 'center'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist=allTodolistTasks

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={3} sx={{p: '10px'}}>
                                        <Todolist
                                            changeTodolistTitle={changeTodolistTitle}
                                            changeTaskTitle={changeTaskTitle}
                                            removeTodolist={removeTodolist}
                                            key={tl.id}
                                            todolistId={tl.id}
                                            filter={tl.filter}
                                            changeTaskStatus={changeTaskStatus}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>

                </Container>
            </div>
        </ThemeProvider>
    )
        ;
})

export default App;