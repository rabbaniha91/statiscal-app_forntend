// import { useLanguage } from "@/contexts/LanguageContext";
// import { basicStatiscalContent } from "@/data";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   ScatterChart,
//   Scatter,
//   ZAxis,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// const PlotsComponent = ({ data }: { data: any }) => {
//   const { language } = useLanguage();
//   const index = language === "fa" ? "fa" : "en";
//   const t = basicStatiscalContent[index].plots;

//   // پردازش داده‌ها
//   let sortedData = [...data].sort((a, b) => a - b);

//   // نمونه‌گیری در صورت زیاد بودن داده‌ها
//   const sampleData = sortedData.length > 1000 ? sortedData.filter((_, i) => i % Math.ceil(sortedData.length / 1000) === 0) : sortedData;

//   const plotData = sampleData.map((value, index) => ({
//     x: index + 1,
//     value,
//   }));

//   const BoxPlot = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <LineChart data={plotData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="x"
//           interval="preserveStartEnd"
//         />
//         <YAxis />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="value"
//           stroke="#8884d8"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );

//   const Histogram = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <BarChart data={plotData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="x"
//           interval="preserveStartEnd"
//         />
//         <YAxis />
//         <Tooltip />
//         <Bar
//           dataKey="value"
//           fill="#8884d8"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );

//   const ScatterPlot = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <ScatterChart>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="x"
//           interval="preserveStartEnd"
//         />
//         <YAxis dataKey="value" />
//         <ZAxis range={[50]} />
//         <Tooltip />
//         <Scatter
//           data={plotData}
//           fill="#8884d8"
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );

//   const SkewnessPlot = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <LineChart data={plotData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="value"
//           interval="preserveStartEnd"
//         />
//         <YAxis />
//         {plotData.length <= 1000 && <Tooltip />}
//         <Line
//           type="monotone"
//           dataKey="x"
//           stroke="red"
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );

//   return (
//     <Card className="text-center bg-inherit mx-auto max-w-6xl shadow-none">
//       <CardHeader>
//         <CardTitle>{t.title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="boxPlot">
//           <TabsList>
//             <TabsTrigger value="boxPlot">{t.boxPlot}</TabsTrigger>
//             <TabsTrigger value="histogram">{t.histogram}</TabsTrigger>
//             <TabsTrigger value="scatter">{t.scatter}</TabsTrigger>
//             <TabsTrigger value="skewness">{t.skewness}</TabsTrigger>
//           </TabsList>

//           <TabsContent value="boxPlot">
//             <BoxPlot />
//           </TabsContent>
//           <TabsContent value="histogram">
//             <Histogram />
//           </TabsContent>
//           <TabsContent value="scatter">
//             <ScatterPlot />
//           </TabsContent>
//           <TabsContent value="skewness">
//             <SkewnessPlot />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// };

// export default PlotsComponent;

// import { useLanguage } from "@/contexts/LanguageContext";
// import { basicStatiscalContent } from "@/data";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// const calculateStats = (data: number[]) => {
//   const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
//   const variance = data.reduce((sum, val) => sum + (val - mean) ** 2, 0) / data.length;
//   const stdDev = Math.sqrt(variance);
//   return { mean, stdDev };
// };

// const generateNormalDistribution = (data: number[]) => {
//   const { mean, stdDev } = calculateStats(data);
//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const step = (max - min) / 50;
//   const normalData = [];

//   for (let x = min; x <= max; x += step) {
//     const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2));
//     const xValue = parseFloat(x.toFixed(3));
//     normalData.push({ x: xValue, value: y });
//   }

//   return normalData;
// };

// const groupData = (data: number[]) => {
//   const freqMap: { [key: number]: number } = {}; // تعیین نوع صریح برای شیء
//   data.forEach((num) => {
//     const key = Math.round(num * 10) / 10;
//     freqMap[key] = (freqMap[key] || 0) + 1;
//   });
//   return Object.keys(freqMap).map((key) => ({
//     x: parseFloat(key),
//     value: freqMap[parseFloat(key)],
//   }));
// };

// const PlotsComponent = ({ data }: { data: any }) => {
//   const { language } = useLanguage();
//   const index = language === "fa" ? "fa" : "en";
//   const t = basicStatiscalContent[index].plots;

//   const groupedData = groupData(data);
//   const normalDistData = generateNormalDistribution(data);

//   const Histogram = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <BarChart data={groupedData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="x"
//           angle={-45}
//           tickMargin={10}
//         />
//         <YAxis />
//         <Tooltip />
//         <Bar
//           dataKey="value"
//           fill="#8884d8"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );

//   const SkewnessPlot = () => (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <LineChart data={normalDistData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="x"
//           angle={-45}
//           tickMargin={10}
//         />
//         <YAxis />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="value"
//           stroke="red"
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
//   return (
//     <Card className="text-center bg-inherit mx-auto max-w-6xl shadow-none">
//       <CardHeader>
//         <CardTitle>{t.title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="histogram">
//           <TabsList>
//             <TabsTrigger value="histogram">{t.histogram}</TabsTrigger>
//             <TabsTrigger value="skewness">{t.skewness}</TabsTrigger>
//           </TabsList>
//           <TabsContent value="histogram">
//             <Histogram />
//           </TabsContent>
//           <TabsContent value="skewness">
//             <SkewnessPlot />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// };

// export default PlotsComponent;

import { useLanguage } from "@/contexts/LanguageContext";
import { basicStatiscalContent } from "@/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useMemo } from "react";
import useAnalyze from "@/contexts/StatisticContext";

// const adaptiveSampling = (data: number[], maxPoints = 1000) => {
//   if (data.length <= maxPoints) return data;

//   const stride = Math.ceil(data.length / maxPoints);
//   return data.filter((_, index) => index % stride === 0);
// };

const PlotsComponent = () => {
  const { language } = useLanguage();
  const { analyzeState } = useAnalyze();
  const index = language === "fa" ? "fa" : "en";
  const t = basicStatiscalContent[index].plots;

  const dataType = useMemo(() => analyzeState.dataType, [analyzeState.dataType]);
  const processedData = useMemo(() => analyzeState.ferquency, [analyzeState.ferquency, dataType]);
  const normalDistribution = useMemo(() => analyzeState.density, [analyzeState.density]);
  // const sampledData = useMemo(() => adaptiveSampling(data), [data]);

  useEffect(() => {
    console.log("processedData: ", processedData);
  }, [processedData]);

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

  // const renderScatterPlot = () => (
  //   <ResponsiveContainer
  //     width="100%"
  //     height={400}
  //   >
  //     <ScatterChart>
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis
  //         type="number"
  //         dataKey="x"
  //         name={t.index}
  //         tickFormatter={(value) => value.toFixed(0)}
  //       />
  //       <YAxis
  //         type="number"
  //         dataKey="value"
  //         name={t.value}
  //       />
  //       <Tooltip cursor={{ strokeDasharray: "3 3" }} />
  //       <Scatter
  //         data={sampledData.map((value, index) => ({ x: index, value }))}
  //         fill="#8884d8"
  //       />
  //     </ScatterChart>
  //   </ResponsiveContainer>
  // );

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

          {/* <TabsContent value="scatter">
            {renderScatterPlot()}
            <div className="mt-4 text-sm text-muted-foreground">
              {t.sampleSize}: {sampledData.length} ({Math.round((sampledData.length / data.length) * 100)}%)
            </div>
          </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlotsComponent;
