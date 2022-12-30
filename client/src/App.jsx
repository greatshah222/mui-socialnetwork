import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import { useSelector } from "react-redux";

import { createTheme } from "@mui/material/styles";

import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const isAuth = Boolean(useSelector((state) => state.token));
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {/* Css baseline is resetting css fro mui */}
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={!isAuth ? <LoginPage /> : <Navigate to="/home" />} />
                        <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
                        <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
