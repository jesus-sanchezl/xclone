import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Avatar,
    Typography,
    Button,
    CardMedia,
    Tabs,
    Tab,
    Tooltip,
} from "@mui/material";
import { CalendarMonth, LocationOn, CakeOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { AuthContext } from "../context/AuthContext";

import { useUser } from "../hooks/useUser";
import { useUserStats } from "../hooks/useUserStats";

import { ErrorMessage } from "../components/Common/ErrorMessage";
import { BackButton } from "../components/Common/BackButton";
import { UserTweets } from "../components/Tweet/UserTweets";
import { PageWrapper } from "../components/Layout/PageWrapper";
import { CenteredLoader } from "../components/Common/CenteredLoader";

import defaultCover from "../assets/default_cover.png";
import defaultImage from "../assets/default_profile.jpeg";

export const UserPage = () => {
    const { id } = useParams();
    const { user: authUser } = useContext(AuthContext);
    const { user, loading, error } = useUser(id);
    const {
        totalTweets,
        setTotalTweets,
        loading: statsLoading,
        error: statsError,
    } = useUserStats(id);

    const isOwnProfile = authUser?.id === Number(id);

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("posts");

    if (loading) return <CenteredLoader />;

    if (error) return <ErrorMessage message={error} />;

    const formattedBirthdate = user.birthdate
        ? format(new Date(user.birthdate), "dd 'de' MMMM 'de' yyyy", {
              locale: es,
          })
        : "Fecha no disponible";

    const formattedCreatedAt = user.created_at
        ? format(new Date(user.created_at), "MMMM 'de' yyyy", { locale: es })
        : "Fecha no disponible";

    const tabBaseSx = {
        textTransform: "none",
        fontWeight: 600,
        minHeight: 48,
        px: 2,
        "&.Mui-selected": { color: "text.primary" },
        "&:hover": { backgroundColor: "action.hover" },
    };

    return (
        <PageWrapper>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "60px",
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "rgba(255,255,255,0.6)",
                        borderRadius: "50%",
                    }}
                    onClick={() => navigate("/home")}
                >
                    <BackButton />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {user.username}
                    </Typography>
                    {statsLoading ? (
                        <Typography variant="body2" color="text.secondary">
                            Cargando...
                        </Typography>
                    ) : statsError ? (
                        <Typography variant="body2" color="error">
                            Error al cargar tweets
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {totalTweets} posts
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        user.cover_image
                            ? `${import.meta.env.VITE_BACKEND}/images/${
                                  user.cover_image
                              }`
                            : defaultCover
                    }
                    alt="Imagen de portada"
                />
                <Avatar
                    src={
                        user.profile_image
                            ? `${import.meta.env.VITE_BACKEND}/images/${
                                  user.profile_image
                              }`
                            : defaultImage
                    }
                    sx={{
                        width: 100,
                        height: 100,
                        position: "absolute",
                        bottom: -40,
                        left: 20,
                        border: "4px solid white",
                    }}
                />
                {isOwnProfile ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            position: "absolute",
                            bottom: -60,
                            right: 20,
                            borderRadius: "999px",
                            padding: "6px 16px",
                            fontWeight: "bold",
                            textTransform: "none",
                            color: "black",
                            borderColor: "#cfd9de",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.03)",
                            },
                        }}
                        onClick={() => navigate(`/user/update`)}
                    >
                        Editar perfil
                    </Button>
                ) : (
                    <Box sx={{ position: "absolute", bottom: -60, right: 20 }}>
                        <Tooltip
                            title="Disponible próximamente"
                            arrow
                            placement="bottom-end"
                            disableInteractive
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "999px",
                                    px: 2,
                                    py: "6px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    color: "white",
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "#333",
                                    },
                                }}
                            >
                                Seguir
                            </Button>
                        </Tooltip>
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 6, px: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    {user.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    @{user.username}
                </Typography>

                {user.bio && (
                    <Typography variant="body1" sx={{ mt: 1, mb: 1.5 }}>
                        {user.bio}
                    </Typography>
                )}

                {user.location && (
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                        }}
                    >
                        <LocationOn fontSize="small" /> {user.location}
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                    }}
                >
                    <CakeOutlined fontSize="small" /> Fecha de nacimiento:{" "}
                    {formattedBirthdate}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                    }}
                >
                    <CalendarMonth fontSize="small" /> Se unió en{" "}
                    {formattedCreatedAt}
                </Typography>
            </Box>

            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons="auto"
                sx={{
                    px: 2,
                    borderBottom: "1px solid #e6ecf0",
                    "& .MuiTabs-indicator": {
                        height: 3,
                        borderRadius: 3,
                        backgroundColor: "primary.main",
                    },
                }}
            >
                <Tab label="Posts" value="posts" sx={tabBaseSx} />

                <Tooltip title="Disponible próximamente" arrow>
                    <span>
                        <Tab
                            label="Respuestas"
                            disabled
                            disableRipple
                            sx={{
                                ...tabBaseSx,
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    color: "text.secondary",
                                    cursor: "default",
                                },
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        />
                    </span>
                </Tooltip>

                <Tooltip title="Disponible próximamente" arrow>
                    <span>
                        <Tab
                            label="Destacados"
                            disabled
                            disableRipple
                            sx={{
                                ...tabBaseSx,
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    color: "text.secondary",
                                    cursor: "default",
                                },
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        />
                    </span>
                </Tooltip>

                <Tooltip title="Disponible próximamente" arrow>
                    <span>
                        <Tab
                            label="Artículos"
                            disabled
                            disableRipple
                            sx={{
                                ...tabBaseSx,
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    color: "text.secondary",
                                    cursor: "default",
                                },
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        />
                    </span>
                </Tooltip>

                <Tooltip title="Disponible próximamente" arrow>
                    <span>
                        <Tab
                            label="Multimedia"
                            disabled
                            disableRipple
                            sx={{
                                ...tabBaseSx,
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    color: "text.secondary",
                                    cursor: "default",
                                },
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        />
                    </span>
                </Tooltip>

                <Tooltip title="Disponible próximamente" arrow>
                    <span>
                        <Tab
                            label="Me gusta"
                            disabled
                            disableRipple
                            sx={{
                                ...tabBaseSx,
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    color: "text.secondary",
                                    cursor: "default",
                                },
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        />
                    </span>
                </Tooltip>
            </Tabs>
            <Box>
                {activeTab === "posts" && (
                    <UserTweets
                        id={user.id}
                        setTotalTweets={setTotalTweets}
                        isOwnProfile={isOwnProfile}
                    />
                )}
            </Box>
        </PageWrapper>
    );
};
