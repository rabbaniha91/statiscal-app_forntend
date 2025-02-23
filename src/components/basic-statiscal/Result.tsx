import { useLanguage } from "@/contexts/LanguageContext";
import { basicStatiscalContent } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import useAnalyze from "@/contexts/StatisticContext";
import { BasicAnalyze } from "@/types";

const ResultsComponent = () => {
  const { analyzeState } = useAnalyze();
  const results = analyzeState.basicAnalyze;
  const { language } = useLanguage();
  const index = language === "en" ? "en" : "fa";
  const t = basicStatiscalContent[index].results;

  const resultItems: { key: keyof BasicAnalyze; label: string }[] = [
    { key: "mean", label: t.mean },
    { key: "median", label: t.median },
    { key: "varians", label: t.variance },
    { key: "stdDev", label: t.stdDev },
    { key: "cv", label: t.cv },
    { key: "q1", label: t.q1 },
    { key: "q3", label: t.q3 },
    { key: "min", label: t.min },
    { key: "max", label: t.max },
    { key: "skewness", label: t.skewness },
    { key: "range", label: t.range },
    { key: "interquartileRange", label: t.interquartileRange },
    { key: "kurtosis", label: t.kurtosis },
  ];

  return (
    <Card className="text-center w-full h-full   bg-inherit  shadow">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resultItems.map(({ key, label }) => (
            <div
              key={key}
              className="p-4 rounded-lg bg-muted"
            >
              <Label className="text-sm text-muted-foreground">{label}</Label>
              <p className="text-2xl font-bold mt-1">{results?.[key]?.toFixed(4) || "—"}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsComponent;
