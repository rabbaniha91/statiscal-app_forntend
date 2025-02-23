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
import { PanelRightOpen } from "lucide-react";

const StatisticalAnalysis = () => {
  const { analyzeDispatch, analyzeState } = useAnalyze();
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = statiscalTabs[index];

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setIsMinimized(true);
      setOpenDrawer(false);
    } else {
      setIsMinimized(false);
      setOpenDrawer(true);
    }
  };

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
          ferquency: results.frequency,
          rowData: results.rowData,
          normalData: results.normalData,
        },
      });

      toast({ variant: "success", description: "Success" });
      setOpenDrawer(true);
      setIsMinimized(false);
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
        <div className="relative h-screen flex items-center justify-center w-full">
          {analyzeState.loading && <Loader />}
          <DataInputComponent onDataSubmit={handleDataSubmit} />
        </div>

        {/* Minimized Sheet Handle */}
        {isMinimized && analyzeState.basicAnalyze && (
          <div
            className="fixed right-0 top-1/2 -translate-y-1/2 w-8 px-1 h-32 bg-slate-200 dark:bg-slate-800 rounded-l-md cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-200 shadow-md"
            onClick={() => {
              setOpenDrawer(true);
              setIsMinimized(false);
            }}
          >
            <div className="h-full flex items-center justify-center">
              <PanelRightOpen
                size={34}
                className="  text-slate-600 dark:text-slate-400"
              />
            </div>
          </div>
        )}

        <Sheet
          open={openDrawer}
          onOpenChange={handleSheetOpenChange}
        >
          <Tabs
            defaultValue="basic-data"
            className="w-full"
          >
            <SheetContent
              side={"right"}
              className="min-w-full md:min-w-[95%] overflow-y-auto "
            >
              <SheetHeader>
                <TabsList className="w-full mb-6 h-12">
                  <TabsTrigger
                    value="basic-data"
                    className="flex-1 h-10 rounded-md dark:data-[state=active]:bg-slate-950 data-[state=active]:bg-slate-300 transition-colors duration-200"
                  >
                    {t.title.bsicData}
                  </TabsTrigger>
                  <TabsTrigger
                    value="charts"
                    className="flex-1 h-10 rounded-md dark:data-[state=active]:bg-slate-950 data-[state=active]:bg-slate-300 transition-colors duration-200"
                  >
                    {t.title.charts}
                  </TabsTrigger>
                </TabsList>
              </SheetHeader>
              <SheetDescription>
                <TabsContent
                  value="basic-data"
                  className="mt-4 animate-fade"
                >
                  {analyzeState.basicAnalyze && <ResultsComponent />}
                </TabsContent>
                <TabsContent
                  value="charts"
                  className="mt-4 animate-fade"
                >
                  {analyzeState.density && <PlotsComponent />}
                </TabsContent>
              </SheetDescription>
            </SheetContent>
          </Tabs>
        </Sheet>
      </div>
    </section>
  );
};

export default StatisticalAnalysis;
