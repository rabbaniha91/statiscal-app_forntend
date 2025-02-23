import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Check, Eraser, Home, Info, Plus, Table2, TextCursorInput, Upload, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { statisticalTests } from "@/data";
import { Tests } from "@/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

// Types
interface DataPoint {
  id: number;
  value: string;
}

interface TestInfo {
  type: Tests;
  minSamples: number;
  groups?: number;
  variables?: number;
}

interface DataGroup {
  label: string;
  data: DataPoint[];
}

interface FormattedData {
  type: Tests;
  test: string;
  dataType: "continuous" | "discrete" | null;
  data: number[] | { [key: string]: number[] } | null;
  file: File | null;
}

const DataInputComponent = ({ onDataSubmit }: { onDataSubmit: (data: any) => void }) => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  // State
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [dataGroups, setDataGroups] = useState<Map<string, DataGroup>>(new Map());
  const [countOfInputGroups, setCountOfInputGroups] = useState<number>(2);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSetUserInputGroup, setIsUserInputGroup] = useState(false);
  const [dataType, setDataType] = useState<("continuous" | "discrete") | null>(null);
  const [disabledRun, setDisabledRun] = useState(true);

  // Get current test requirements and info
  const getCurrentTest = useCallback(() => {
    return statisticalTests
      .flatMap((cat) => cat.subcategories)
      .flatMap((sub) => sub.tests)
      .find((t) => t.id === selectedTest);
  }, [selectedTest]);

  const getTestRequirements = useCallback((): TestInfo => {
    const test = getCurrentTest();
    return test?.dataRequirements || { type: "single", minSamples: 1 };
  }, [getCurrentTest]);

  // Handle data groups based on test type
  const initializeDataGroups = useCallback(
    (requirements: TestInfo) => {
      const newGroups = new Map<string, DataGroup>();
      switch (requirements.type) {
        case "paired":
          newGroups.set("group1", { label: language === "en" ? "Group 1" : "گروه اول", data: [] });
          newGroups.set("group2", { label: language === "en" ? "Group 2" : "گروه دوم", data: [] });
          break;
        case "multi-group":
          for (let i = 0; i < countOfInputGroups; i++) {
            newGroups.set(`group${i + 1}`, {
              label: `${language === "en" ? "Group" : "گروه"} ${i + 1}`,
              data: [],
            });
          }
          break;
        case "multi-variable":
          for (let i = 0; i < countOfInputGroups; i++) {
            newGroups.set(`var${i + 1}`, {
              label: `${language === "en" ? "Variable" : "متغیر"} ${i + 1}`,
              data: [],
            });
          }
          break;
        default:
          newGroups.set("main", { label: language === "en" ? "Data Input" : "ورودی داده", data: [] });
      }

      setDataGroups(newGroups);
    },
    [language, countOfInputGroups]
  );

  useEffect(() => {
    switch (getCurrentTest()?.dataRequirements.type) {
      case "multi-group":
        setIsUserInputGroup(true);
        break;
      case "multi-variable":
        setIsUserInputGroup(true);
        break;
      default:
        setIsUserInputGroup(false);
        break;
    }
  }, [selectedTest]);

  // Reset component state
  const resetState = useCallback(() => {
    setDataGroups(new Map());
    setUploadedFile(null);
    setDisabledRun(true);
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback(
    (file: File) => {
      // const requirements = getTestRequirements();
      const allowedTypes = new Set([".csv", ".xlsx", ".xls"]);
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      if (!allowedTypes.has(fileExtension)) {
        alert(language === "en" ? "Invalid file type" : "نوع فایل نامعتبر است");
        return;
      }

      setUploadedFile(file);
      setDisabledRun(false);
    },
    [getTestRequirements, language]
  );

  // Format data for submission
  const formatDataForSubmission = useCallback(() => {
    const requirements = getTestRequirements();
    let formattedData = new FormData();

    formattedData.append("dataType", dataType === "continuous" ? "continuous" : "discrete");
    formattedData.append("test", selectedTest);
    formattedData.append("type", requirements.type);
    if (uploadedFile) {
      formattedData.append("file", uploadedFile);
    }

    switch (requirements.type) {
      case "paired":
      case "multi-group":
      case "multi-variable": {
        const groupedData: { [key: string]: number[] } = {};
        dataGroups.forEach((group, key) => {
          groupedData[key] = group.data.map((d) => parseFloat(d.value)).filter((v) => !isNaN(v));
        });
        formattedData.append("data", JSON.stringify(groupedData));
        break;
      }
      default: {
        const singleData =
          dataGroups
            .get("main")
            ?.data.map((d) => parseFloat(d.value))
            .filter((v) => !isNaN(v)) || [];
        formattedData.append("data", JSON.stringify(singleData));
      }
    }

    return formattedData;
  }, [dataGroups, uploadedFile, getTestRequirements]);

  // Render set user group data modal

  const SetUserGroupModal = () => {
    return (
      <Dialog
        open={isSetUserInputGroup}
        onOpenChange={setIsUserInputGroup}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" font-bold text-xl">{language === "fa" ? "ستون داده" : "Data Columns"}</DialogTitle>
            <DialogDescription>
              {language === "fa"
                ? "لطفا تعداد ستون داده را با توجه به نمونه های خود مشخص کنید."
                : "Please specify the number of data columns according to your samples."}
            </DialogDescription>
          </DialogHeader>
          <Input
            type="number"
            value={countOfInputGroups}
            onChange={(e) => setCountOfInputGroups(parseInt(e.target.value))}
          />
          <DialogFooter>
            <Button
              variant={"ghost"}
              size={"lg"}
              onClick={() => setIsUserInputGroup(false)}
            >
              {language === "fa" ? "تائید" : "Ok"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Render test information modal
  const TestInfoModal = () => {
    const test = getCurrentTest();
    if (!test) return null;

    return (
      <AlertDialog
        open={isInfoModalOpen}
        onOpenChange={setIsInfoModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{test.title[index]}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                {language === "en"
                  ? "Please input your data according to the test requirements:"
                  : "لطفا داده‌های خود را مطابق با الزامات آزمون وارد کنید:"}
              </p>
              <ul className="list-disc list-inside">
                <li>
                  {language === "en"
                    ? `Minimum samples required: ${test.dataRequirements.minSamples}`
                    : `حداقل نمونه مورد نیاز: ${test.dataRequirements.minSamples}`}
                </li>
                <li>{language === "en" ? `Data type: ${test.dataRequirements.type}` : `نوع داده: ${test.dataRequirements.type}`}</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-white dark:bg-slate-950 hover:bg-white  dark:hover:bg-slate-950">
              <Button
                size={"lg"}
                variant={"ghost"}
                className=" flex items-center justify-center gap-2 text-slate-950 dark:text-slate-50"
              >
                {language === "fa" ? "بستن" : "Close"}
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  // Render data input groups
  const renderDataInputGroups = () => {
    const InputGroup = ({ groupKey, group }: { groupKey: string; group: DataGroup }) => (
      <div className="border p-4 rounded-lg bg-muted/5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Table2 className="h-4 w-4" />
            {group.label}
          </h3>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (selectedTest) {
                      const newData = [...group.data, { id: group.data.length + 1, value: "" }];
                      setDataGroups(new Map(dataGroups.set(groupKey, { ...group, data: newData })));
                    }
                  }}
                  disabled={!selectedTest}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{language === "en" ? "Add data field" : "افزودن فیلد داده"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDataGroups(new Map(dataGroups.set(groupKey, { ...group, data: [] })));
                    setDisabledRun(true);
                  }}
                  disabled={group.data.length === 0}
                >
                  <Eraser className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{language === "en" ? "Clear data fields" : "حذف فیلدها"}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.data.map((dataPoint) => (
            <Input
              key={dataPoint.id}
              type="number"
              autoFocus={group.data.length === dataPoint.id}
              className="w-24 h-9"
              value={dataPoint.value}
              onChange={(e) => {
                const newData = group.data.map((d) => (d.id === dataPoint.id ? { ...d, value: e.target.value } : d));
                setDataGroups(new Map(dataGroups.set(groupKey, { ...group, data: newData })));
                setDisabledRun(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const newData = [...group.data, { id: group.data.length + 1, value: "" }];
                  setDataGroups(new Map(dataGroups.set(groupKey, { ...group, data: newData })));
                }
              }}
            />
          ))}
        </div>
      </div>
    );

    return (
      <div className={`grid grid-cols-${2} gap-4`}>
        {Array.from(dataGroups.entries()).map(([key, group]) => (
          <InputGroup
            key={key}
            groupKey={key}
            group={group}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="h-[95vh] max-w-7xl w-full overflow-hidden shadow-xl">
      <CardContent className="h-full flex flex-col gap-6 p-6 bg-gradient-to-b from-background to-muted/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            {language === "en" ? "Dashboard" : "داشبورد"}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsInfoModalOpen(true)}
              disabled={!selectedTest}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Test Selection */}
        <div className=" flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4 w-[95%]">
            <Select
              value={dataType === "continuous" ? "continuous" : dataType === "discrete" ? "discrete" : ""}
              onValueChange={(v: "continuous" | "discrete") => {
                setDataType(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Select Data Type" : "انتخاب نوع داده"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="continuous">{language === "en" ? "Continuous" : "پیوسته"}</SelectItem>
                <SelectItem value="discrete">{language === "en" ? "Discrete" : "گسسته"}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={(v) => {
                setSelectedCategory(v);
                setSelectedSubcategory("");
                setSelectedTest("");
                resetState();
              }}
              disabled={!dataType}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Select Category" : "انتخاب دسته"} />
              </SelectTrigger>
              <SelectContent>
                {statisticalTests.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.title[index]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedSubcategory}
              onValueChange={(v) => {
                setSelectedSubcategory(v);
                setSelectedTest("");
                resetState();
              }}
              disabled={!selectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Select Type" : "انتخاب نوع"} />
              </SelectTrigger>
              <SelectContent>
                {statisticalTests
                  .find((c) => c.id === selectedCategory)
                  ?.subcategories.map((sub) => (
                    <SelectItem
                      key={sub.id}
                      value={sub.id}
                    >
                      {sub.title[index]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTest}
              onValueChange={(v) => {
                setSelectedTest(v);
                resetState();
              }}
              disabled={!selectedSubcategory}
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Select Test" : "انتخاب آزمون"} />
              </SelectTrigger>
              <SelectContent>
                {statisticalTests
                  .find((c) => c.id === selectedCategory)
                  ?.subcategories.find((s) => s.id === selectedSubcategory)
                  ?.tests.map((test) => (
                    <SelectItem
                      key={test.id}
                      value={test.id}
                    >
                      {test.title[index]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={"outline"}
              onClick={() => {
                initializeDataGroups(getTestRequirements());
              }}
              disabled={!selectedTest}
            >
              <TextCursorInput className="h-4 w-4" />
              {language === "fa" ? "ورود دستی" : "Manual Data"}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileRef.current?.click()}
              disabled={!selectedTest}
            >
              {!uploadedFile ? <Upload className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              {uploadedFile ? (language === "en" ? "File Selected" : "فایل انتخاب شد") : language === "en" ? "Upload File" : "آپلود فایل"}
            </Button>
            {uploadedFile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setUploadedFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <div className="">
              {/* File requirements info */}
              {selectedTest && !uploadedFile && (
                <div className=" text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {language === "en"
                      ? "Supported file formats: CSV, Excel (.xlsx, .xls)"
                      : "فرمت‌های فایل پشتیبانی شده: CSV، اکسل (.xlsx, .xls)"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Input Area */}
        <ScrollArea className="flex-1 border rounded-lg p-4">{!uploadedFile && renderDataInputGroups()}</ScrollArea>

        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="destructive"
            onClick={() => {
              resetState();
              if (fileRef.current) fileRef.current.value = "";
            }}
            disabled={!selectedTest || (dataGroups.size === 0 && !uploadedFile)}
          >
            {language === "en" ? "Clear All" : "پاک کردن همه"}
          </Button>

          <Button
            size="lg"
            onClick={() => {
              const formattedData = formatDataForSubmission();
              dataType && onDataSubmit(formattedData);
            }}
            disabled={disabledRun || !selectedTest}
          >
            {language === "en" ? "Run Analysis" : "اجرای تحلیل"}
          </Button>
        </div>

        {/* Hidden File Input */}
        <Input
          type="file"
          ref={fileRef}
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload(file);
            }
          }}
        />

        {/* Modals */}
        <TestInfoModal />
        <SetUserGroupModal />
      </CardContent>
    </Card>
  );
};

export default DataInputComponent;
