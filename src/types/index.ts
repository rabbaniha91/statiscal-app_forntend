export interface Signup {
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface Login {
  email: string;
  password: string;
}

export interface UserState {
  info?: any;
  accessToken?: string;
}

export type UserActionType = "SET_USER" | "RESET_USER";

export interface UserAction {
  type: UserActionType;
  payload?: {
    user?: any;
    accessToken?: string;
  };
}

export interface BasicAnalyze {
  mean: number;
  median: number;
  varians: number;
  stdDev: number;
  q1: number;
  q3: number;
  cv: number;
  min: number;
  max: number;
  skewness: number;
}

export interface AnalyzeData {
  ferquency: [{ x: number; count: number }] | null;
  density: [{ x: number; value: number }] | null;
  rowData: number[] | null;
  dataType: "discrete" | "continuous";
  basicAnalyze: BasicAnalyze | null;
  loading: boolean;
}

export type AnalyzeActionType = "SET_DATA" | "RESET_DATA" | "RECIVE_DATA";

export interface AnalyzeAction {
  type: AnalyzeActionType;
  payload?: any;
}
