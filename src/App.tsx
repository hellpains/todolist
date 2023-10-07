import React, {useState} from 'react';
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
import {AddCircleOutlineOutlined, Brightness4Outlined} from "@mui/icons-material";

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


function App() {
    // BLL
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ])
    const [tasks, setTasks] = useState<TasksForTodolistType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],

    })

    const [lightMode, setLightMode] = useState(true)

    // CRUD tasks
    const addTask = (title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }
    const changeTaskTitle = (title: string, taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, title} : t)})
    }

    // CRUD todolists
    const addTodolist = (title: string) => {
        const id = v1()
        setTodolists([{id, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [id]: []})

    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))

        delete tasks[todolistId]
        setTasks({...tasks})
    }


    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
            mode: lightMode ? 'light' : "dark"
        },
    });

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
                                onClick={() => setLightMode(!lightMode)}
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
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                            }

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
}

export default App;




