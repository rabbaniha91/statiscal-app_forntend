import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <span className={`h-[1.2rem] w-[1.2rem] rotate-0  transition-all ${language === "fa" ? "scale-0" : "scale-100"}`}>en</span>
          <span className={`absolute h-[1.2rem] w-[1.2rem]   transition-all ${language === "en" ? "scale-0" : "scale-100"}`}>fa</span>
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={`${language === "fa" && "bg-gray-500"}`}
          onClick={() => setLanguage("fa")}
        >
          {language === "en" ? "Farsi" : "فارسی"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${language === "en" && "bg-gray-500"}`}
          onClick={() => setLanguage("en")}
        >
          {language === "en" ? "English" : "انگلیسی"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
