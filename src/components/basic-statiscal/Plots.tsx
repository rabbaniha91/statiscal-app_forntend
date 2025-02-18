import { useLanguage } from "@/contexts/LanguageContext";
import { basicStatiscalContent } from "@/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useMemo } from "react";
import useAnalyze from "@/contexts/StatisticContext";

const PlotsComponent = () => {
  const { language } = useLanguage();
  const { analyzeState } = useAnalyze();
  const index = language === "fa" ? "fa" : "en";
  const t = basicStatiscalContent[index].plots;

  const dataType = useMemo(() => analyzeState.dataType, [analyzeState.dataType]);
  const processedData = useMemo(() => analyzeState.ferquency, [analyzeState.ferquency, dataType]);
  const normalDistribution = useMemo(() => analyzeState.density, [analyzeState.density]);

  const renderHistogram = () => (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <BarChart data={processedData ? processedData : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          angle={dataType === "continuous" ? -45 : 0}
          tickFormatter={(value) => (dataType === "continuous" ? value.toFixed(2) : value.toString())}
          tickMargin={10}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [value, t.frequency]}
          labelFormatter={(label) => `${t.value}: ${label.toFixed(2)}`}
        />
        <Bar
          dataKey="count"
          fill="#8884d8"
          name={t.frequency}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderDensityPlot = () => (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <LineChart data={normalDistribution ? normalDistribution : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          tickFormatter={(value) => value.toFixed(2)}
          tickMargin={10}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [value.toExponential(2), t.density]}
          labelFormatter={(label) => `${t.value}: ${label.toFixed(2)}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ff7300"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="text-center bg-inherit mx-auto max-w-7xl shadow-none">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="histogram">
          <TabsList>
            <TabsTrigger value="histogram">{t.histogram}</TabsTrigger>
            <TabsTrigger value="density">{t.density}</TabsTrigger>
            {/* <TabsTrigger value="scatter">{t.scatter}</TabsTrigger> */}
          </TabsList>

          <TabsContent value="histogram">
            {renderHistogram()}
            <div className="mt-4 text-sm text-muted-foreground">{dataType === "discrete" ? t.discreteWarning : t.continuousWarning}</div>
          </TabsContent>

          <TabsContent value="density">
            {renderDensityPlot()}
            <div className="mt-4 text-sm text-muted-foreground">{t.densityDescription}</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlotsComponent;
