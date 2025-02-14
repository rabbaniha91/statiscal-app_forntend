import { lazy, Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { AnalyzeProvider } from "@/contexts/StatisticContext";

const Components = lazy(() => import("../components/basic-statiscal"));

const BasicStatiscalContent = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AnalyzeProvider>
        <Components />
      </AnalyzeProvider>
    </Suspense>
  );
};

export default BasicStatiscalContent;
