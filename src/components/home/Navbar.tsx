import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Calculator, EllipsisVertical, GraduationCap, Info, Layout, LogIn, User } from "lucide-react";
import { homeContent } from "@/data";
import { ModeToggle } from "../ModeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const NavItem = ({ children, isActive = false }: { children: any; isActive: boolean }) => (
  <div
    className={cn(
      "relative px-4 py-2 transition-all duration-300 rounded-lg group hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground"
    )}
  >
    <span className="relative z-10">{children}</span>
    {isActive && <span className="absolute inset-0 bg-primary/10 rounded-lg" />}
    <span className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

// Text content in both languages

const Navbar = ({ isAuthenticated = false }) => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "/", icon: Layout },
    { key: "tools", icon: Calculator },
    { key: "learn", icon: GraduationCap },
    { key: "about", icon: Info },
  ];

  const NavContent = ({ isMobile = false }) => (
    <div className={cn("flex items-center gap-6", isMobile ? "flex-col items-start w-full" : "hidden md:flex")}>
      {navItems.map(({ key, icon: Icon }) => {
        const index = key === "/" ? "home" : key === "tools" ? "tools" : key === "learn" ? "learn" : "about";
        return (
          <Link
            onClick={() => setActiveItem(key)}
            to={t.nav[index].path}
            key={key}
          >
            <NavItem isActive={activeItem === key}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />

                <span>{t.nav[index].title}</span>
              </div>
            </NavItem>
          </Link>
        );
      })}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0  z-50 transition-all duration-300 ",
        isScrolled ? "bg-slate-100/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm" : "dark:bg-slate-950 bg-slate-100"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className={`flex items-center justify-between ${isScrolled ? "h-16" : "h-20"}`}>
          <div className=" flex items-center gap-2">
            {/* Mobile Menu */}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <EllipsisVertical className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "fa" ? "right" : "left"}>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <NavContent isMobile />
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-slate-900 dark:bg-slate-100 rounded-lg transform rotate-45" />
                <Layout className="relative z-10 w-8 h-8 text-slate-50 dark:text-slate-950 p-1.5" />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">StatApp</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavContent />

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <LanguageToggle />

            {/* Auth Button */}
            {isAuthenticated ? (
              <Link to={t.nav.profile.path}>
                <Button
                  variant="ghost"
                  className="gap-2"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{t.nav.profile.title}</span>
                </Button>
              </Link>
            ) : (
              <Link to={t.nav.login.path}>
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="gap-2 "
                >
                  <LogIn className="h-5 w-5" />
                  <span className="hidden sm:inline">{t.nav.login.title}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Animated Gradient Line */}
      <div
        className="h-0.5 absolute bottom-0 left-0 right-0 bg-gradient-to-r 
      from-slate-300/50 via-slate-400/50 to-gray-300/50 opacity-50 dark:from-slate-700/50 dark:via-slate-600/50 dark:to-gray-700/50"
      />
    </header>
  );
};

export default Navbar;
