
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { NavLink } from "react-router-dom";

const navigationItems = [
    {
        label: "Contracts",
        path: "/contracts",
        icon: <DescriptionOutlinedIcon />,
    },
    {
        label: "Suppliers",
        path: "/suppliers",
        icon: <BusinessOutlinedIcon />,
    },
];

function AppNavigation() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "#183153",
                borderBottom: "1px solid #304766",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 72,
                        gap: 5,
                        flexWrap: "wrap",
                    }}
                >
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to="/contracts"
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                        }}
                    >
                        Contract Management
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        {navigationItems.map((item) => (
                            <Button
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    color: "white",
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    textTransform: "none",
                                    "&.active": {
                                        bgcolor: "white",
                                        color: "#183153",
                                    },
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.12)",
                                    },
                                    "&.active:hover": {
                                        bgcolor: "#edf1f6",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppNavigation;
