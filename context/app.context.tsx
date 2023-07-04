"use client";

import React, { Dispatch, createContext, useReducer, useContext } from "react";
import { defaultLocale } from "i18n/config";
type StateType = {
  lang: string;
};

type ActionType = {
  type: string;
  value: any;
};

const initialState: StateType = {
    lang: defaultLocale,
};

export const SET_LOCALE = "SET_LOCALE"

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, lang: action.value };
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useAppContext = () => useContext(CounterContext)