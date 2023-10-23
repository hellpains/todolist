import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4Outlined } from "@mui/icons-material";
import { useMods } from "../common/hooks/useMods";
import { Todolists } from "../features/Todolists/Todolists";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { logoutTC } from "../features/Login/auth-reducer";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useDispatch";

export const App = React.memo(() => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status);
  const { theme, setDarkMode, lightMode } = useMods();
  const isInitialized = useAppSelector<boolean>(state => state.app.initialized);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, [isLoggedIn]);

  if (!isInitialized) {
    return (
      <div style={{ position: "absolute", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className={"App"}>
        <ErrorSnackbar />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h4">Todolist</Typography>
              <div>
                <Button
                  sx={{ mr: "20px" }}
                  variant={"outlined"}
                  color={"inherit"}
                  onClick={setDarkMode}
                  endIcon={<Brightness4Outlined />}
                >
                  {lightMode ? "Dark mode" : "Light mode"}
                </Button>
                {isLoggedIn && (
                  <Button onClick={logoutHandler} variant={"outlined"} color={"inherit"}>
                    LogOut
                  </Button>
                )}
              </div>
            </Toolbar>
            {status === "loading" && <LinearProgress />}
          </AppBar>
          <Container fixed>
            <Routes>
              <Route path={"/*"} element={<Todolists />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
});

export default App;
