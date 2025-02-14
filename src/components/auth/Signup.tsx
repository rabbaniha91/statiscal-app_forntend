import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { signup } from "@/apis";
import useUser from "@/contexts/userContext";
import { useState } from "react";
import Loader from "../Loader";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export function Signup() {
  const { toast } = useToast();
  const nvaigate = useNavigate();
  const { language } = useLanguage();
  const { dispatch } = useUser();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordSchema = z
    .string()
    .min(8, { message: language === "en" ? "Password must be at least 8 characters." : "رمزعبور باید حداقل 8 کارکتر داشته باشد." })
    .max(50, { message: language === "en" ? "Password must be at max 20 characters." : "رمزعبور باید حداکثر 20 کارکتر داشته باشد" })
    .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/), {
      message:
        language === "en"
          ? "The password must contain uppercase and lowercase English letters, numbers, and at least one special character (!@#$%^&*)."
          : "رمزعبور باید دارای حروف انگلیسی بزرگ و کوچک، اعداد و حداقل یکی از کاراکترهای خاص(!@#$%^&*) باشد.",
    });

  const formSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: language === "en" ? "Lastname must be at least 3 characters." : "نام خانوادگی باید حداقل 3 حرف داشته باشد.",
      })
      .regex(/[a-zA-Z0-9]+/, {
        message:
          language === "en"
            ? "Usernames can only contain uppercase and lowercase English letters and numbers."
            : "نام کاربری تنها می تواند شامل حروف بزرگ و کوچک انگلیسی و اعداد باشد.",
      }),
    email: z.string().email({
      message: language === "en" ? "Invalid email" : "ایمیل نامعتبر.",
    }),
    password: passwordSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    try {
      const data = await signup(values, signal);
      dispatch({ type: "SET_USER", payload: { user: data?.user, accessToken: data?.accessToken } });
      toast({
        description: language === "en" ? "Signup completed" : "ثبت نام موفق",
        variant: "success",
        className: "fixed top-1 left-1/2 -translate-x-1/2 w-[95%] md:w-2/3 lg:w-1/3",
      });
      nvaigate("/");
    } catch (error: any) {
      console.log(error);
      const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Server error";
      toast({
        title: language === "en" ? "Signup faild" : "ثبت نام ناموفق",
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
        className="space-y-8  w-full py-8 px-4 animate-fade"
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Username" : "نام کاربری"}</FormLabel>
              <FormControl>
                <Input
                  className=" focus:bg-slate-100 dark:focus:bg-slate-600 transition-all"
                  placeholder={language === "en" ? "Username" : "نام کاربری"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button
          type="submit"
          size={"xl"}
        >
          {language === "en" ? "Sign up" : "ثبت نام"}
        </Button>
      </form>
    </Form>
  );
}
