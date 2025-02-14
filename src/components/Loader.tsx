import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className=" z-[9999999] absolute inset-0 flex items-center justify-center bg-slate-50/90 dark:bg-slate-950/90">
      <LoaderCircle
        className=" animate-spin text-slate-950 dark:text-slate-50"
        size={44}
      />
    </div>
  );
};

export default Loader;
