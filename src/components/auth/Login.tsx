import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import useUser from "@/contexts/userContext";
import { useState } from "react";
import { login } from "@/apis";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../Loader";

export function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordSchema = z
    .string()
    .min(8, { message: language === "en" ? "Password must be at least 8 characters." : "رمزعبور باید حداقل 8 کارکتر داشته باشد." })
    .max(20, { message: language === "en" ? "Password must be at max 20 characters." : "رمزعبور باید حداکثر 20 کارکتر داشته باشد" })
    .refine((password) => /[A-Za-z0-9!@#$%^&*]/.test(password), {
      message:
        language === "en"
          ? "The password must contain uppercase and lowercase English letters, numbers, and at least one special character (!@#$%^&*)."
          : "رمزعبور باید دارای حروف انگلیسی بزرگ و کوچک، اعداد و حداقل یکی از کاراکترهای خاص(!@#$%^&*) باشد.",
    });

  const formSchema = z.object({
    email: z.string().email({
      message: language === "en" ? "Invalid email" : "ایمیل نامعتبر.",
    }),
    password: passwordSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    try {
      const data = await login(values, signal);
      dispatch({ type: "SET_USER", payload: { user: data?.user, accessToken: data?.accessToken } });
      toast({
        description: language === "en" ? "Login successfull" : "ورود موفق",
        variant: "success",
        className: "fixed top-1 left-1/2 -translate-x-1/2 w-[95%] md:w-2/3 lg:w-1/3",
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Server error";
      toast({
        title: language === "en" ? "Login faild" : "ورود ناموفق",
        description: errorMsg,
        variant: "destructive",
        className: "fixed top-1 left-1/2 -translate-x-1/2 w-[95%] md:w-2/3 lg:w-1/3",
      });
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      {loading && <Loader />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full py-8 px-4 animate-fade"
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Email" : "ایمیل"}</FormLabel>
              <FormControl>
                <Input
                  className=" focus:bg-slate-100 dark:focus:bg-slate-600 transition-all"
                  placeholder={language === "en" ? "Email" : "ایمیل"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Password" : "رمزعبور"}</FormLabel>
              <FormControl>
                <div className=" relative">
                  <Input
                    type={!showPassword ? "password" : "text"}
                    className=" focus:bg-slate-100 dark:focus:bg-slate-600 transition-all"
                    placeholder={language === "en" ? "Password" : "رمزعبور"}
                    {...field}
                  />
                  <div
                    className={`absolute inset-y-0  flex items-center px-3 cursor-pointer ${language === "en" ? "right-0" : "left-0"}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex items-center gap-4 w-full">
          <Button
            size={"full"}
            type="submit"
          >
            {language === "en" ? "Login" : "ورود"}
          </Button>
          <Link
            to={"/"}
            className=" w-full"
          >
            <Button
              size={"full"}
              variant={"secondary"}
            >
              {language === "en" ? "Back" : "بازگشت"}
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
