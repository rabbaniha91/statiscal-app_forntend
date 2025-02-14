import { AnalyzeData, AnalyzeAction } from "@/types";
import { createContext, ReactNode, useReducer, Dispatch, useContext, useEffect } from "react";

const initialState: AnalyzeData = {
  ferquency: null,
  density: null,
  rowData: null,
  dataType: "continuous",
  basicAnalyze: null,
  loading: false,
};

const analyzeContext = createContext<{
  analyzeState: AnalyzeData;
  analyzeDispatch: Dispatch<AnalyzeAction>;
}>({
  analyzeState: initialState,
  analyzeDispatch: () => null,
});

const reducer = (state: AnalyzeData, action: AnalyzeAction): AnalyzeData => {
  switch (action.type) {
    case "RECIVE_DATA":
      return {
        ...state,
        loading: !state.loading,
      };
    case "SET_DATA":
      return {
        ...state,
        loading: false,
        basicAnalyze: action.payload?.basicAnalyze,
        dataType: action.payload?.dataType,
        density: action.payload?.density,
        ferquency: action.payload?.ferquency,
        rowData: action.payload.rowData,
      };
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};

const AnalyzeProvider = ({ children }: { children: ReactNode }) => {
  const [analyzeState, analyzeDispatch] = useReducer(reducer, initialState);

  return <analyzeContext.Provider value={{ analyzeState, analyzeDispatch }}>{children}</analyzeContext.Provider>;
};

export { AnalyzeProvider };

const useAnalyze = () => useContext(analyzeContext);

export default useAnalyze;
