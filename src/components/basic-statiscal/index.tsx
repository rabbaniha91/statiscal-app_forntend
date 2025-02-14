import DataInputComponent from "./DataInput";
import ResultsComponent from "./Result";
import PlotsComponent from "./Plots";
import { callBasicCalsApi } from "@/apis";
import { toast } from "@/hooks/use-toast";
import useAnalyze from "@/contexts/StatisticContext";
import { useCallback, useState } from "react";
import Loader from "../Loader";
import { useLanguage } from "@/contexts/LanguageContext";
import { statiscalTabs } from "@/data";
import { Tabs, TabsList } from "../ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader } from "../ui/sheet";

const StatisticalAnalysis = () => {
  const { analyzeDispatch, analyzeState } = useAnalyze();
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = statiscalTabs[index];

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDataSubmit = useCallback(async (data: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    analyzeDispatch({ type: "RECIVE_DATA" });
    try {
      const { results } = await callBasicCalsApi(data, signal);
      analyzeDispatch({
        type: "SET_DATA",
        payload: {
          basicAnalyze: results.basicAnalyze,
          dataType: results.dataType,
          density: results.density,
          ferquency: results.ferquency,
          rowData: results.rowData,
        },
      });

      toast({ variant: "success", description: "Success" });
      setOpenDrawer(true);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      toast({ variant: "destructive", description: errorMsg });
      analyzeDispatch({ type: "RECIVE_DATA" });
    }

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 w-full">
        <div className="relative h-full">
          {analyzeState.loading && <Loader />}
          <DataInputComponent onDataSubmit={handleDataSubmit} />
        </div>

        <Sheet
          open={openDrawer}
          onOpenChange={setOpenDrawer}
        >
          <Tabs
            defaultValue="basic-data"
            className="w-full"
          >
            <SheetContent
              side={"right"}
              className=" !w-[1200px]"
            >
              <SheetHeader>
                <TabsList className="w-full mb-6">
                  <TabsTrigger
                    value="basic-data"
                    className="flex-1"
                  >
                    {t.title.bsicData}
                  </TabsTrigger>
                  <TabsTrigger
                    value="charts"
                    className="flex-1"
                  >
                    {t.title.charts}
                  </TabsTrigger>
                </TabsList>
              </SheetHeader>
              <SheetDescription>
                <TabsContent
                  value="basic-data"
                  className="mt-4"
                >
                  {analyzeState.basicAnalyze && <ResultsComponent />}
                </TabsContent>
                <TabsContent
                  value="charts"
                  className="mt-4"
                >
                  {analyzeState.density && <PlotsComponent />}
                </TabsContent>
              </SheetDescription>
            </SheetContent>
          </Tabs>
        </Sheet>
      </div>
      <div
        style={{ clipPath: "polygon(100% 0%, 100% 50%, 100% 100%, 77% 83%, 63% 50%, 74% 20%)" }}
        className=" w-3 h-[60vh] absolute right-0 top-1/2 -translate-y-1/2 border-l border-t border-b"
      ></div>
    </section>
  );
};

export default StatisticalAnalysis;
