import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderComponent } from "./context/AuthContext.jsx";
import { TweetsProvider } from "./context/TweetsContext.jsx";
import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProviderComponent>
                <TweetsProvider>
                
                        <App />
                    
                </TweetsProvider>
            </AuthProviderComponent>
        </BrowserRouter>
    </StrictMode>
);
