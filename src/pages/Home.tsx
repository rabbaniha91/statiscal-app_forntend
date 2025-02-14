// Home.tsx
import { lazy, Suspense } from "react";
import PageLoader from "@/components/PageLoader";

// لودینگ مصنوعی با تاخیر ۵ ثانیه
const HomeComponents = lazy(() => import("../components/home"));

const Home = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomeComponents />
    </Suspense>
  );
};

export default Home;
