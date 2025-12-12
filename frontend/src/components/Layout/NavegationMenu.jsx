import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    Box,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    Avatar,
    Tooltip,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";

import {
    X as XIcon,
    Home as HomeIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    AutoAwesome as AutoAwesomeIcon,
    ViewList as ViewListIcon,
    Bookmark as BookmarkIcon,
    Groups as GroupsIcon,
    Person as PersonIcon,
    MoreHoriz as MoreHorizIcon,
    Create as CreateIcon,
} from "@mui/icons-material";

import { useTweetsContext } from "../../context/TweetsContext";
import { AuthContext } from "../../context/AuthContext";

import { sendTweetService } from "../../services/tweet/tweetServices";

import { NewTweetModal } from "../Tweet/NewTweetModal";
import { TweetFormModal } from "../Tweet/TweetFormModal";
import { ConfirmationModal } from "../Common/ConfirmationModal";

import defaultImage from "../../assets/default_profile.jpeg";

export const NavigationMenu = () => {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const { addTweet } = useTweetsContext();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [loggingOut, setLoggingOut] = useState(false);

    const isAccountMenuOpen = Boolean(menuAnchor);
    const handleOpenAccountMenu = (e) => setMenuAnchor(e.currentTarget);
    const handleCloseAccountMenu = () => setMenuAnchor(null);

    const openConfirm = () => {
        setConfirmOpen(true);
        handleCloseAccountMenu();
    };
    const closeConfirm = () => setConfirmOpen(false);

    const handleLogoutConfirm = async () => {
        try {
            setLoggingOut(true);
            await logout?.();
            navigate("/");
        } finally {
            setLoggingOut(false);
            closeConfirm();
        }
    };

    const handleAddTweetSubmit = async ({ data, token }) => {
        const response = await sendTweetService({ data, token });
        return response;
    };

    const menuItems = [
        { icon: <HomeIcon />, label: "Inicio", to: "/home" },
        { icon: <SearchIcon />, label: "Explorar", to: "/search" },
        {
            icon: <NotificationsIcon />,
            label: "Notificaciones",
            to: "/notifications",
        },
        { icon: <MailIcon />, label: "Mensajes", to: "/messages" },
        { icon: <AutoAwesomeIcon />, label: "Grok", to: "/grok" },
        { icon: <ViewListIcon />, label: "Listas", to: "/lists" },
        { icon: <BookmarkIcon />, label: "Guardados", to: "/bookmarks" },
        { icon: <GroupsIcon />, label: "Comunidades", to: "/communities" },
        { icon: <XIcon />, label: "Premium", to: "/premium" },
        { icon: <PersonIcon />, label: "Perfil", to: `/user/${user?.id}` },
        { icon: <MoreHorizIcon />, label: "Más opciones", to: "/more" },
    ];

    

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                px: 1,
                py: 0.5,
                flexShrink: 0,
                width: "100%",
                alignItems: {
                    xs: "flex-end",
                    lg: "flex-end",
                    xl: "flex-start",
                },
            }}
        >
            <Box>
                <Box sx={{ mb: 2 }}>
                    <IconButton
                        disableRipple
                        onClick={() => navigate("/home")}
                        aria-label="Ir al inicio"
                        sx={{
                            p: 1,
                            color: "text.primary",
                            "&:hover": { backgroundColor: "#E7E7E8" },
                        }}
                    >
                        <XIcon sx={{ fontSize: "2rem" }} />
                    </IconButton>
                </Box>

                <List sx={{ width: "100%" }}>
                    {menuItems.map(({ icon, label, to }) => (
                        <NavLink
                            key={label}
                            to={to}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {({ isActive }) => (
                                <ListItemButton
                                    component="div"
                                    sx={{
                                        borderRadius: "50px",
                                        mb: 1,
                                        width: "100%",
                                        justifyContent: {
                                            xs: "center",
                                            lg: "flex-end",
                                            xl: "flex-start",
                                        },
                                        pr: { xs: 0, lg: 0.5, xl: 2 },
                                        pl: { xs: 0, lg: 0, xl: 2 },
                                        color: isActive
                                            ? "text.primary"
                                            : "text.secondary",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: { xs: "flex", xl: "none" },
                                            alignItems: "center",
                                            mr: 1,
                                        }}
                                    >
                                        <Tooltip
                                            title={label}
                                            placement="right"
                                            arrow
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "auto",
                                                    color: isActive
                                                        ? "text.primary"
                                                        : "text.secondary",
                                                    "& svg": {
                                                        fontSize: isActive
                                                            ? "1.8rem"
                                                            : "1.5rem",
                                                    },
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                        </Tooltip>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: { xs: "none", xl: "flex" },
                                            alignItems: "center",
                                            mr: 2,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "auto",
                                                color: isActive
                                                    ? "text.primary"
                                                    : "text.secondary",
                                                "& svg": {
                                                    fontSize: isActive
                                                        ? "1.8rem"
                                                        : "1.5rem",
                                                },
                                            }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: {
                                                xs: "none",
                                                xl: "block",
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    fontWeight={
                                                        isActive ? 700 : 400
                                                    }
                                                    fontSize={
                                                        isActive
                                                            ? "1.15rem"
                                                            : "1rem"
                                                    }
                                                    color={
                                                        isActive
                                                            ? "text.primary"
                                                            : "text.secondary"
                                                    }
                                                >
                                                    {label}
                                                </Typography>
                                            }
                                        />
                                    </Box>
                                </ListItemButton>
                            )}
                        </NavLink>
                    ))}
                </List>

                <Button
                    variant="contained"
                    onClick={openModal}
                    sx={{
                        display: { xs: "none", xl: "inline-flex" },
                        borderRadius: "50px",
                        mt: 2,
                        gap: 1,
                        backgroundColor: "black",
                        fontWeight: "bold",
                        color: "white",
                        width: 220,
                        height: 50,
                        fontSize: "16px",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    Postear
                </Button>

                <IconButton
                    onClick={openModal}
                    aria-label="Crear tweet"
                    sx={{
                        display: { xs: "inline-flex", xl: "none" },
                        bgcolor: "black",
                        color: "white",
                        mt: 2,
                        mr: { xs: 0.5, sm: 1 },
                        "&:hover": {
                            bgcolor: "#333",
                        },
                    }}
                >
                    <CreateIcon />
                </IconButton>
            </Box>

            <Box
                mb={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",

                    borderRadius: { xs: "50%", xl: "999px" },

                    width: { xs: "auto", xl: "100%" },
                    ml: { xs: "auto", xl: 0 },

                    p: { xs: 0.5, xl: 1 },
                    pl: { xs: 0.5, xl: 1 },
                    pr: { xs: 0.5, xl: 1 },

                    justifyContent: { xs: "flex-end", xl: "flex-start" },
                    alignSelf: { xs: "auto", xl: "stretch" },

                    "&:hover": {
                        backgroundColor: "#E7E7E8",
                    },
                }}
                role="button"
                tabIndex={0}
                onClick={handleOpenAccountMenu}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                        handleOpenAccountMenu(e);
                }}
            >
                
                <Avatar
                    alt="Profile"
                    src={
                        user?.profile_image
                            ? `${import.meta.env.VITE_BACKEND}/images/${
                                  user.profile_image
                              }`
                            : defaultImage
                    }
                    sx={{ width: 40, height: 40 }}
                />

                <Box sx={{ display: { xs: "none", xl: "block" }, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold" noWrap>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        @{user?.username}
                    </Typography>
                </Box>

                <IconButton
                    disableRipple
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAccountMenu(e);
                    }}
                    aria-label="Abrir menú de cuenta"
                    sx={{
                        display: { xs: "none", xl: "inline-flex" },
                        ml: { xs: 0, xl: "auto" },
                        "&:hover": { backgroundColor: "transparent" },
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Box>

            <Menu
                anchorEl={menuAnchor}
                open={isAccountMenuOpen}
                onClose={handleCloseAccountMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minWidth: 260,
                        mt: -3.5,
                        ml: 3,
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleCloseAccountMenu();
                        navigate(`/user/${user?.id}`);
                    }}
                    sx={{ fontWeight: 600 }}
                >
                    Ver Perfil
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleCloseAccountMenu();
                        navigate("/settings/password");
                    }}
                    sx={{ fontWeight: 600 }}
                >
                    Cambiar contraseña
                </MenuItem>

                <MenuItem onClick={openConfirm} sx={{ fontWeight: 600 }}>
                    Cerrar sesión de @{user?.username}
                </MenuItem>
            </Menu>

            <ConfirmationModal
                open={confirmOpen}
                onClose={closeConfirm}
                onConfirm={handleLogoutConfirm}
                title="¿Deseas cerrar sesión?"
                description={`Cerrarás la sesión de @${user?.username} en este dispositivo.`}
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
                loading={loggingOut}
                icon={<XIcon sx={{ fontSize: 36 }} />}
            />

            <NewTweetModal open={isModalOpen} onClose={closeModal}>
                <TweetFormModal
                    onSubmit={handleAddTweetSubmit}
                    onAdd={addTweet}
                    onClose={closeModal}
                    placeholder="¿Qué está pasando?"
                    buttonText="Postear"
                />
            </NewTweetModal>
        </Box>
    );
};
