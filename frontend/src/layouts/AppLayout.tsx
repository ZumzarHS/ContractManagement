
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";

function AppLayout() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
            <AppNavigation />

            <Container
                maxWidth="xl"
                sx={{ py: 5 }}
            >
                <Outlet />
            </Container>
        </Box>
    );
}

export default AppLayout;
