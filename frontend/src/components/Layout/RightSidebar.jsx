import {
    Box,
    InputBase,
    Typography,
    Avatar,
    Button,
    IconButton,
    Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const RightSidebar = () => {
    const suggestions = [
        { name: "Equipo XClone", username: "@xclone_team", avatar: null },
        { name: "React Lovers", username: "@reactlovers", avatar: null },
        { name: "MUI España", username: "@mui_es", avatar: null },
    ];

    const trends = [
        {
            title: "Stack principal",
            hashtag: "#ReactJS",
            tweets: "Proyecto construido con React + Vite",
        },
        {
            title: "Tecnología destacada",
            hashtag: "#MaterialUI",
            tweets: "Interfaz basada en componentes MUI",
        },
        {
            title: "En desarrollo",
            hashtag: "#AuthFlow",
            tweets: "Flujo de autenticación multipaso completado",
        },
        {
            title: "Explorando",
            hashtag: "#NextSteps",
            tweets: "Novedades y mejoras continuas",
        },
    ];

    return (
        <Box
            component="aside"
            sx={{
                height: "100%",
                width: "100%",
                overflowY: "auto",
                flexShrink: 0,

                "&::-webkit-scrollbar": { width: 0, height: 0 },

                scrollbarWidth: "none",

                msOverflowStyle: "none",
            }}
        >
            <Box
                sx={{
                    border: "1px solid #eff3f4",
                    borderRadius: "9999px",
                    px: 2,
                    minHeight: 42,
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    transition:
                        "background-color .15s, box-shadow .15s, border-color .15s",
                    "&:hover": { backgroundColor: "#fff" },
                    "&:focus-within": {
                        borderColor: "#1d9bf0",
                        boxShadow: "0 0 0 2px rgba(29,155,240,0.2)",
                        backgroundColor: "#fff",
                    },
                }}
            >
                <SearchIcon
                    sx={{ color: "#536471", mr: 0.5 }}
                    fontSize="small"
                />
                <InputBase
                    placeholder="Buscar"
                    fullWidth
                    sx={{
                        fontSize: 15,
                        color: "#0f1419",
                        "&::placeholder": {
                            color: "#536471",
                            opacity: 1,
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
                    mb: 2,
                    overflow: "hidden",
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Qué está pasando
                </Typography>

                {trends.map((trend, index) => (
                    <Box
                        key={index}
                        sx={{
                            mx: -2,
                            px: 2,
                            py: 1.25,
                            mb: 1.5,
                            borderRadius: 2,
                            transition: "background-color 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#f7f9f9",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: 12 }}
                                >
                                    {trend.title}
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {trend.hashtag}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: 12 }}
                                >
                                    {trend.tweets}
                                </Typography>
                            </Box>

                            <IconButton
                                size="small"
                                aria-label="Más opciones de esta tendencia"
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <MoreHorizIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Box>
                    </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                    Mostrar más
                </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
                    mb: 2,
                    overflow: "hidden",
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        A quién seguir
                    </Typography>

                    {suggestions.map((user, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mx: -2,
                                px: 2,
                                py: 1.25,
                                mb: 1.5,
                                borderRadius: 2,
                                transition: "background-color 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "#f7f9f9",
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar
                                    src={user.avatar || undefined}
                                    alt={user.name}
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        variant="body2"
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {user.username}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: "9999px",
                                    px: 2,
                                    minHeight: 32,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    boxShadow: "none",
                                    backgroundColor: "#000",
                                    color: "#fff",
                                }}
                            >
                                Seguir
                            </Button>
                        </Box>
                    ))}

                    <Typography variant="body2" color="text.secondary">
                        Mostrar más
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: 2,
                    px: 1,
                    color: "text.secondary",
                    fontSize: "12px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    lineHeight: 1.5,
                }}
            >
                <Link
                    href="https://jesus-sanchezl.github.io/Porfolio-Jesus-Sanchez/"
                    underline="hover"
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ cursor: "pointer" }}
                >
                    Portfolio
                </Link>

                <Box component="span">·</Box>
                <Link
                    href="https://github.com/jesus-sanchezl/xclone"
                    underline="hover"
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ cursor: "pointer" }}
                >
                    GitHub
                </Link>

                <Box component="span">·</Box>

                <Link
                    href="https://www.linkedin.com/in/jesus-sanchezl/"
                    underline="hover"
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ cursor: "pointer" }}
                >
                    LinkedIn
                </Link>

                <Box component="span">·</Box>
                <Link
                    href="mailto:jesus-sanchezl@outlook.es"
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                >
                    Contacto
                </Link>

                <Box sx={{ width: "100%", mt: 0.5 }}>
                    © {new Date().getFullYear()} Jesús Sánchez
                </Box>
            </Box>
        </Box>
    );
};
