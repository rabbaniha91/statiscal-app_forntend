import { LoaderCircle } from "lucide-react";

const PageLoader = () => {
  return (
    <div className=" z-50 fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <LoaderCircle
        className=" animate-spin text-slate-950 dark:text-slate-50"
        size={44}
      />
    </div>
  );
};

export default PageLoader;
