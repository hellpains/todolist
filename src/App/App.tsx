import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Brightness4Outlined} from "@mui/icons-material";
import {useMods} from "./hooks/useMods";
import {Todolists} from "../features/Todolists/Todolists";


export const App = React.memo(() => {
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
                    <Todolists/>
                </Container>
            </div>
        </ThemeProvider>
    );
})


export default App;