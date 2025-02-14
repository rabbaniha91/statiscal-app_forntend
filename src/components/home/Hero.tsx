import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowRight, BarChart3, Calculator, LineChart, Microscope, PieChart, Table, TrendingUp, User } from "lucide-react";
import { homeContent } from "@/data";

const HeroToolsDropdown = ({ language }: { language: "fa" | "en" | "system" }) => {
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"lg"}
          className="gap-2"
        >
          {t.hero.tools.trigger}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuItem className="gap-2">
          <Calculator className="h-4 w-4" />
          {t.hero.tools.basic}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <TrendingUp className="h-4 w-4" />
          {t.hero.tools.advanced}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <BarChart3 className="h-4 w-4" />
          {t.hero.tools.visualization}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Microscope className="h-4 w-4" />
          {t.hero.tools.research}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const StatBox = ({ icon: Icon, value }: { icon: any; value: any }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
    <Icon className="h-4 w-4 text-primary" />
    <span className="font-semibold">{value}</span>
  </div>
);

const AnimatedShape = ({ className }: { className: string }) => (
  <div
    className={`absolute opacity-10 dark:opacity-20 ${className}`}
    style={{
      background: "linear-gradient(120deg, var(--primary) 0%, transparent 100%)",
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    }}
  />
);

const Hero = () => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];
  const dir = language === "fa" ? "rtl" : "ltr";

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16">
      {/* Animated background shapes */}
      <AnimatedShape className="w-96 h-96 -top-48 -left-48 animate-pulse" />
      <AnimatedShape className="w-96 h-96 -bottom-48 -right-48 animate-pulse delay-300" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left/Text content */}
          <div className={`text-${dir === "rtl" ? "right" : "left"} space-y-6`}>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">{t.hero.title}</h1>
              <p className="text-xl text-muted-foreground">{t.hero.subtitle}</p>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">{t.hero.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2"
              >
                {t.hero.cta.primary}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <HeroToolsDropdown language={language} />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <StatBox
                icon={User}
                value={t.hero.stats.users}
              />
              <StatBox
                icon={Calculator}
                value={t.hero.stats.calculations}
              />
              <StatBox
                icon={Table}
                value={t.hero.stats.institutions}
              />
            </div>
          </div>

          {/* Right/Visual content */}
          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 grid grid-cols-2 gap-8">
                {[LineChart, BarChart3, PieChart, TrendingUp].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl transform transition-transform hover:scale-105"
                  >
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
