import { useLanguage } from "@/contexts/LanguageContext";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuhtComponent = () => {
  const { language } = useLanguage();
  return (
    <Tabs
      defaultValue="login"
      className="w-full min-h-screen flex flex-col items-center gap-8  py-12"
    >
      <TabsList className="w-[95%] md:w-2/3 lg:w-1/3 h-12">
        <TabsTrigger
          className=" w-1/2 h-10"
          value="signup"
        >
          {language === "en" ? "Signup" : "ثبت نام"}
        </TabsTrigger>
        <TabsTrigger
          value="login"
          className=" w-1/2 h-10"
        >
          {language === "en" ? "Login" : "ورود"}
        </TabsTrigger>
      </TabsList>
      <div
        className=" relative w-[95%] md:w-2/3 lg:w-1/3 ring-1 ring-slate-300 dark:ring-slate-600 
      shadow-lg rounded-md bg-slate-200 dark:bg-slate-700 text-black dark:text-white/95"
      >
        <TabsContent
          className="  w-full flex items-center justify-center"
          value="signup"
        >
          <Signup />
        </TabsContent>
        <TabsContent
          className="  w-full flex items-center justify-center"
          value="login"
        >
          <Login />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AuhtComponent;
