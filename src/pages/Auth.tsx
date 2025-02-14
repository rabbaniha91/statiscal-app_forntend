import PageLoader from "@/components/PageLoader";
import { lazy, Suspense } from "react";

const AuhtComponent = lazy(() => import("../components/auth"));

const Auth = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuhtComponent />
    </Suspense>
  );
};

export default Auth;
