import React, {useEffect} from 'react';
import '../App.css';
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Brightness4Outlined} from "@mui/icons-material";
import {useApp} from "./hooks/useApp";
import {useMods} from "./hooks/useMods";
import {TaskType, todolistsAPI} from "../api/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed'




export type TasksForTodolistType = {
    [key: string]: TaskType[]
}


export const App = React.memo(() => {
    const {
        todolists, addTodolist, removeTodolist, changeFilter, changeTodolistTitle,
        tasks, addTask, removeTask, changeTaskTitle, changeTaskStatus
    } = useApp()
    const {theme, setDarkMode, lightMode} = useMods()





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
                            let tasksForTodolist = allTodolistTasks

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