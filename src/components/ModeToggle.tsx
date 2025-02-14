import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Theme, useTheme } from "@/contexts/ThemContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { language } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]  transition-all " />
          ) : (
            <Moon className="absolute h-[1.2rem] w-[1.2rem]  transition-all " />
          )}
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent align="end">
        <DropdownMenuItem className={`${theme === "light" && "bg-gray-500"}`}>{language === "en" ? "Light" : "روشن"}</DropdownMenuItem>
        <DropdownMenuItem className={`${theme === "dark" && "bg-gray-500"}`}>{language === "en" ? "Dark" : "تاریک"}</DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
