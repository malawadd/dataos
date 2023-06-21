import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

const initialState = {
  address: "",
  wallet: "",
  pkh: "",
};

const actions = {
  USER_INFO_UPDATE: "user_info_update",
};

interface UserInfo {
  address: string;
  wallet: string;
  pkh: string;
}

interface ContextType {
  userInfo: UserInfo;
  updateUserInfo: Dispatch<Partial<UserInfo>>;
}

const updateUserInfo = (state: any, userInfo: UserInfo) => ({
  ...state,
  ...userInfo,
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.USER_INFO_UPDATE:
      const a = updateUserInfo(state, action.payload);
      return a;
    default:
      throw new Error();
  }
};

const UserContext = createContext<ContextType>({
  userInfo: initialState,
  updateUserInfo: (userInfo: Partial<UserInfo>) => {},
} as ContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUserInfo = (userInfo: Partial<UserInfo>) => {
    dispatch({ type: actions.USER_INFO_UPDATE, payload: userInfo });
  };

  return (
    <UserContext.Provider value={{ userInfo: state, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
