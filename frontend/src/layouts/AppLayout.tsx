import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";

function AppLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#f5f7fa",
            }}
        >
            <AppNavigation />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    p: 4,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;