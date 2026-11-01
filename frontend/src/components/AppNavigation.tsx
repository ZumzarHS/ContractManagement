import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 260;

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
    {
        label: "Catalog items",
        path: "/catalogitems",
        icon: <Inventory2OutlinedIcon />,
    },
];

function AppNavigation() {
    const location = useLocation();
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "#183153",
                    color: "white",
                    borderRight: "none",
                },
            }}
        >
            <Box sx={{ px: 3, py: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 0.3,
                    }}
                >
                    Contract
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: "#a9c4e8",
                    }}
                >
                    Management
                </Typography>
            </Box>

            <Divider sx={{ borderColor: "#304766" }} />

            <List sx={{ px: 2, py: 2 }}>
                {navigationItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        selected={
                            location.pathname === item.path ||
                            location.pathname.startsWith(`${item.path}/`)
                        }
                        sx={{
                            mb: 1,
                            borderRadius: 1,
                            color: "#d3dce8",
                            "& .MuiListItemIcon-root": {
                                color: "inherit",
                                minWidth: 40,
                            },
                            "&.Mui-selected": {
                                bgcolor: "white",
                                color: "#183153",
                            },
                            "&.Mui-selected:hover": {
                                bgcolor: "#edf1f6",
                            },
                            "&:hover": {
                                bgcolor: "rgba(255,255,255,0.12)",
                            },
                        }}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.label}
                            slotProps={{
                                primary: {
                                    sx: {
                                        fontWeight: 500,
                                    },
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}

export default AppNavigation;