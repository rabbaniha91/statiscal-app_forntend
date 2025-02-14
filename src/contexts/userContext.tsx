import { UserAction, UserState } from "@/types";
import { createContext, ReactNode, useReducer, Dispatch, useContext, useEffect } from "react";

const initialState: UserState = {
  info: undefined,
  accessToken: undefined,
};

const userContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        info: action.payload?.user,
        accessToken: action.payload?.accessToken,
      };
    case "RESET_USER":
      return initialState;
    default:
      return state;
  }
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <userContext.Provider value={{ state, dispatch }}>{children}</userContext.Provider>;
};

export { UserProvider };

const useUser = () => useContext(userContext);

export default useUser;
