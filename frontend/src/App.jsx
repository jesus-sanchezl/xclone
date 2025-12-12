import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Box } from "@mui/material";

import { AuthContext } from "./context/AuthContext";

import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TweetPage } from "./pages/TweetPage";
import { InitialPage } from "./pages/InitialPage";
import { UserPage } from "./pages/UserPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CookiesPage } from "./pages/CookiesPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";

import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { NavigationMenu } from "./components/Layout/NavegationMenu";
import { RightSidebar } from "./components/Layout/RightSidebar";
import { LoadingScreen } from "./components/Common/LoadingScreen";

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <LoadingScreen />;

    if (!user) {
        return (
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "auto minmax(0, 600px)",
                        md: "64px 700px",
                        lg: "72px 600px 350px",
                        xl: "240px 600px 350px",
                    },
                    columnGap: { xs: "12px", md: "20px", lg: "24px" },
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "1240px",
                }}
            >
                <Box
                    component="aside"
                    sx={{
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        flexShrink: 0,
                        px: { xs: 1, sm: 0 },
                    }}
                >
                    <NavigationMenu />
                </Box>

                <Box
                    component="main"
                    sx={{
                        minHeight: "100vh",
                        overflow: "visible",
                    }}
                >
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<HomePage />} />

                        <Route path="/tweet/:id" element={<TweetPage />} />
                        <Route path="/user/:id" element={<UserPage />} />
                        <Route
                            path="/user/update"
                            element={<EditProfilePage />}
                        />

                        <Route
                            path="/settings/password"
                            element={<ChangePasswordPage />}
                        />

                        <Route
                            path="/search"
                            element={<ComingSoonPage title="Explorar" />}
                        />
                        <Route
                            path="/notifications"
                            element={<ComingSoonPage title="Notificaciones" />}
                        />
                        <Route
                            path="/messages"
                            element={<ComingSoonPage title="Mensajes" />}
                        />
                        <Route
                            path="/grok"
                            element={<ComingSoonPage title="Grok" />}
                        />
                        <Route
                            path="/lists"
                            element={<ComingSoonPage title="Listas" />}
                        />
                        <Route
                            path="/bookmarks"
                            element={<ComingSoonPage title="Guardados" />}
                        />
                        <Route
                            path="/jobs"
                            element={<ComingSoonPage title="Trabajos" />}
                        />
                        <Route
                            path="/communities"
                            element={<ComingSoonPage title="Comunidades" />}
                        />
                        <Route
                            path="/premium"
                            element={<ComingSoonPage title="Premium" />}
                        />
                        <Route
                            path="/verified-orgs"
                            element={
                                <ComingSoonPage title="Organizaciones verificadas" />
                            }
                        />
                        <Route
                            path="/more"
                            element={<ComingSoonPage title="Más opciones" />}
                        />

                        <Route
                            path="*"
                            element={<Navigate to="/home" replace />}
                        />
                    </Routes>
                </Box>

                <Box
                    component="aside"
                    sx={{
                        display: { xs: "none", lg: "block" },
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        width: 350,
                        minWidth: 350,
                    }}
                >
                    <RightSidebar />
                </Box>
            </Box>
        </Box>
    );
};

export default App;
