import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    AppBar, Button, Container, createTheme, CssBaseline, Grid, IconButton, Paper, ThemeProvider, Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {amber, teal} from "@mui/material/colors";
import {Brightness4Outlined} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC
} from "./redux/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";

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


export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)


    // dark-light mode
    const [lightMode, setLightMode] = useState(true)
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
                        <AddItemForm addItem={(title: string) => dispatch(addTodolistAC(title, v1()))}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {todolists.map((tl) => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={3} sx={{p: '10px'}}>
                                        <Todolist
                                            todolist={tl}
                                            key={tl.id}
                                            todolistId={tl.id}
                                            filter={tl.filter}
                                            title={tl.title}
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




