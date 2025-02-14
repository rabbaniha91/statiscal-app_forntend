import { useLanguage } from "@/contexts/LanguageContext";
import { basicStatiscalContent } from "@/data";
import { useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, CircleX, FileSpreadsheet, FileX2, Plus, Upload, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const DataInputComponent = ({ onDataSubmit }: { onDataSubmit: (handleDataSubmit: any) => void }) => {
  const { language } = useLanguage();
  const index = language === "en" ? "en" : "fa";
  const t = basicStatiscalContent[index].dataInput;
  const fileRef = useRef<HTMLInputElement>(null);
  const [manualData, setManualData] = useState([{ id: 1, value: "" }]);
  const [file, setFile] = useState<any>(null);

  const handleAddRow = () => {
    const newId = manualData[manualData.length - 1].id + 1;
    setManualData([...manualData, { id: newId, value: "" }]);
  };

  const handleRemoveRow = (id: number) => {
    if (manualData.length > 1) setManualData(manualData.filter((row) => row.id !== id));
  };

  const handleClear = () => {
    setManualData([{ id: 1, value: "" }]);
  };

  const handleValueChange = (id: number, value: string) => {
    if (file !== null) {
      setFile(null);
    }
    setManualData(manualData.map((row) => (row.id === id ? { ...row, value: value } : row)));
  };

  const handleSubmit = () => {
    if (file === null) {
      const value = manualData.map((row) => parseFloat(row.value)).filter((value) => !isNaN(value));
      onDataSubmit({ data: value });
    } else {
      const formData = new FormData();
      formData.append("file", file);
      onDataSubmit(formData);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-2  bg-slate-100 dark:bg-slate-900/50">
      <Table className="w-full h-full flex flex-col   rounded-md">
        <TableHeader className="flex-shrink-0 border-t">
          <TableRow className="flex items-center justify-start gap-4 py-2 px-4">
            <TableHead>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    className="hover:opacity-70 transition-all flex items-center gap-4"
                    size="icon"
                    onClick={handleAddRow}
                  >
                    <Plus size={34} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t.manual.addRow}</TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead>
              {file === null ? (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => {
                        if (fileRef?.current) {
                          fileRef.current?.click();
                        }
                      }}
                      className="animate-fade group"
                    >
                      <FileSpreadsheet
                        size={34}
                        className="transition-colors duration-200 group-hover:text-green-600"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t.file.browse}</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => {
                        setFile(null);
                      }}
                      className="animate-fade group"
                      variant="destructive"
                    >
                      <CheckIcon className="text-green-700" />
                      <FileX2
                        size={34}
                        className="group-hover:text-red-500 transition-colors duration-200"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{file.name}</span>
                  </TooltipContent>
                </Tooltip>
              )}
            </TableHead>
            <TableHead>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    onClick={handleSubmit}
                    className="group"
                  >
                    <Upload
                      className="group-hover:text-green-600 transition-colors duration-200"
                      size={34}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{language === "en" ? "Submit" : "ارسال"}</TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    onClick={handleClear}
                    className=""
                    variant={"destructive"}
                  >
                    <CircleX
                      className=""
                      size={34}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{language === "en" ? "Clear" : "حذف تمام سلول ها"}</TooltipContent>
              </Tooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
        <ScrollArea className=" flex-1   ">
          <TableBody className="w-full flex items-start gap-2 flex-wrap px-1.5 py-3">
            {manualData.map((row) => (
              <TableRow
                key={row.id}
                className="  border-none flex items-center m-0 p-0"
              >
                <TableCell className="relative p-0 m-0">
                  <Input
                    autoFocus={manualData.length === row.id}
                    type="number"
                    className="ring-1 w-44 lg:w-40  ring-slate-950 dark:ring-slate-50 m-0"
                    value={row.value}
                    onChange={(e) => handleValueChange(row.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddRow();
                      }
                    }}
                  />
                  {manualData.length > 1 && (
                    <Button
                      className="absolute top-1/2 -translate-y-1/2 right-2 z-50"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRow(row.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
      <Input
        accept=".csv, .xlsx, .xls, .xlm"
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={() => {
          if (fileRef.current?.files) {
            console.log("Files: ", fileRef.current.files[0]);
            setFile(fileRef?.current?.files[0]);
          }
        }}
      />
    </div>
  );
};

export default DataInputComponent;
