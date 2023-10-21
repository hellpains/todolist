import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { amber, teal } from "@mui/material/colors";

export const useMods = () => {
  const [lightMode, setLightMode] = useState(true);
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: amber,
      mode: lightMode ? "light" : "dark",
    },
  });

  const setDarkMode = () => {
    setLightMode(!lightMode);
    localStorage.setItem("themeMode", JSON.stringify(!lightMode));
  };
  useEffect(() => {
    let mode = localStorage.getItem("themeMode");
    mode && setLightMode(JSON.parse(mode));
  }, []);

  return { theme, setDarkMode, lightMode };
};
