import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Modal,
    Typography,
    styled,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import React, { useEffect, useState } from "react";
import MyProfile from "./UserSettingsComponents/MyProfile";
import LoginAndSecurity from "./UserSettingsComponents/LoginAndSecurity";
import Activity from "./UserSettingsComponents/Activity";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/actions/userauthaction";

const StyledList = styled(List)({
    "&& .Mui-selected, && .Mui-selected:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        "&, & .MuiListItemIcon-root": {
            color: "white",
        },
    },
    // hover states
    "& .MuiListItemButton-root:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        "&, & .MuiListItemIcon-root": {
            color: "white",
        },
    },
});

const ListTextStyle = {
    paddingLeft: "6px",
    fontSize: "14px",
    fontFamily: "Noto Sans, sans-serif",
    color: "#EBF2FA",
};
const ListStyle = {
    marginBlock: "6px",
};

const UserSettings = ({ isOpen, onClose }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("My Profile");

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            } else if (event.key === "Q" && event.ctrlKey) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    backgroundColor: "#073B4C",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        width: "40vw",
                        minWidth: "180px",
                        flex: "2",
                        backgroundColor: "#122C34",
                        paddingTop: "36px",
                    }}
                >
                    <Box
                        sx={{
                            justifyContent: "left",
                            flexDirection: "coloumn",
                            width: "150px",
                            paddingRight: "12px",
                            backgroundColor: "#122C34",
                        }}
                    >
                        <Typography
                            style={{
                                paddingLeft: "6px",
                                fontFamily: "Sofia Sans,sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#EBF2FA",
                                letterSpacing: ".5px",
                            }}
                        >
                            USER SETTINGS
                        </Typography>

                        <StyledList
                            style={{
                                color: "white",
                            }}
                        >
                            <ListItem disablePadding style={ListStyle}>
                                <ListItemButton
                                    selected={selectedMenuItem === "My Profile"}
                                    onClick={() =>
                                        handleMenuItemClick("My Profile")
                                    }
                                    sx={{ borderRadius: "5px", padding: "0" }}
                                >
                                    <Typography style={ListTextStyle}>
                                        My Profile
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding style={ListStyle}>
                                <ListItemButton
                                    selected={selectedMenuItem === "Security"}
                                    onClick={() =>
                                        handleMenuItemClick("Security")
                                    }
                                    sx={{ padding: "0", borderRadius: "5px" }}
                                >
                                    <Typography style={ListTextStyle}>
                                        Activity
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding style={ListStyle}>
                                <ListItemButton
                                    selected={selectedMenuItem === "Activity"}
                                    onClick={() =>
                                        handleMenuItemClick("Activity")
                                    }
                                    sx={{ padding: "0", borderRadius: "5px" }}
                                >
                                    <Typography style={ListTextStyle}>
                                        Security
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </StyledList>

                        <Divider
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                marginInline: "6px",
                                height: ".1px",
                            }}
                        />
                        <StyledList
                            style={{
                                color: "white",
                            }}
                        >
                            <ListItem disablePadding style={ListStyle}>
                                <ListItemButton
                                    onClick={handleLogout}
                                    sx={{ padding: "0", borderRadius: "5px" }}
                                >
                                    <Typography style={ListTextStyle}>
                                        Logout
                                    </Typography>
                                    <LogoutIcon
                                        sx={{
                                            color: "white",
                                            height: "16px",
                                            marginLeft: "12px",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </StyledList>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        flex: "3",
                        backgroundColor: "transparent",
                        paddingTop: "36px",
                    }}
                >
                    {selectedMenuItem === "My Profile" && <MyProfile />}
                    {selectedMenuItem === "Security" && <LoginAndSecurity />}
                    {selectedMenuItem === "Activity" && <Activity />}
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: 36,
                        right: 100,
                        color: "rgba(255, 255, 255, 0.3)",
                            "&:hover": {
                                color: "rgba(255, 255, 255, 0.8)",
                            },
                    }}
                    onClick={onClose}
                >
                    <HighlightOffIcon
                        sx={{
                            borderRadius: "12px",
                        }}
                    />
                    <Typography>
                        ESC
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserSettings;
