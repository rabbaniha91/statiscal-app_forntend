import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemContext.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
