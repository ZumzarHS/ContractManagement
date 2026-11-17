import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    FormControl,
    Select,
    MenuItem,
    CircularProgress,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEmployee } from "../features/employees/hooks/useEmployee";

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
        label: "Catalog Items",
        path: "/catalogitems",
        icon: <Inventory2OutlinedIcon />,
    },
];

function AppNavigation() {
    const location = useLocation();
    const { employees, selectedEmployee, setSelectedEmployee, isLoading, } = useEmployee();

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
                    display: "flex",
                    flexDirection: "column",
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

            <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
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
            <Box sx={{ px: 2, pb: 3 }}>
                <Divider sx={{ borderColor: "#304766", mb: 2 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <AccountCircleIcon sx={{ color: "#a9c4e8", fontSize: 18 }} />

                        <Typography variant="caption" sx={{ color: "#a9c4e8" }}>
                        Active employee
                        </Typography>
                    </Box>

                <FormControl fullWidth size="small">
                    <Select
                        value={selectedEmployee?.employeeId ?? ""}
                        disabled={isLoading || employees.length === 0}
                        onChange={(event) => {
                            const employee = employees.find(
                                (e) => e.employeeId === event.target.value
                            );

                            if (employee) {
                                setSelectedEmployee(employee);
                            }
                        }}
                        displayEmpty
                        sx={{
                            color: "white",
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#60758f",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#a9c4e8",
                            },
                            ".MuiSvgIcon-root": {
                                color: "white",
                            },
                        }}
                    >
                        {employees.map((employee) => (
                            <MenuItem
                                key={employee.employeeId}
                                value={employee.employeeId}
                            >
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {isLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                        <CircularProgress size={18} sx={{ color: "#a9c4e8" }} />
                    </Box>
                )}

                {!isLoading && employees.length === 0 && (
                    <Typography variant="caption" color="#ffb4ab">
                        No employees available
                    </Typography>
                )}
            </Box>
        </Drawer>
    );
}

export default AppNavigation;