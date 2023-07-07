"use client";

import React, { Dispatch, createContext, useReducer, useContext, useEffect } from "react";
import { initializeFirebaseApp } from '../lib/firebase'
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import Loading from "../components/layout/loading";
import { defaultLocale } from "i18n/config";
type StateType = {
  lang: string;
  dictionary: Object;
  firebase: any;
  firebaseAuth: any;
  user: User | null;
  loading: boolean;
};

type ActionType = {
  type: string;
  value: any;
};

const initialState: StateType = {
    lang: defaultLocale,
    dictionary: {},
    firebase: null,
    firebaseAuth: null,
    user: null,
    loading : false,
};

export const SET_LOCALE = "SET_LOCALE"
export const SET_DICTIONARY = "SET_DICTIONARY"
export const INIT_FIREBASE_APP =  'INIT_FIREBASE_APP';
export const INIT_FIREBASE_AUTH = 'INIT_FIREBASE_AUTH';
export const SET_FIREBASE_APP = 'SET_FIREBASE_APP'
export const SET_USER =  'SET_USER';
export const SET_FIREBASE_AUTH = 'SET_FIREBASE_AUTH';
export const SET_LOADING = 'SET_LOADING';

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, lang: action.value };
    case SET_DICTIONARY:
      return { ...state, dictionary: action.value };
    case INIT_FIREBASE_APP:
        return { ...state, firebase: initializeFirebaseApp() };
    case INIT_FIREBASE_AUTH:
        return { ...state, firebaseAuth: null } 
    case SET_FIREBASE_APP:
        return { ...state, firebase: action.value } 
    case SET_FIREBASE_AUTH:
        return { ...state, firebaseAuth: action.value } 
    case SET_USER:
        return { ...state, user: action.value } 
    case SET_LOADING:
        return { ...state, loading: action.value } 
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

  useEffect(() => {
    try {
      if(state.firebase){
        const auth = getAuth(state.firebase)
        return onAuthStateChanged(auth, (user) => {
          dispatch({type: SET_USER, value: user})
        })
      }
    } catch (error) {
      dispatch({type: SET_USER, value: null})
      throw error
    }
  }, [])

  return (
    <>
      <CounterContext.Provider value={{ state, dispatch }}>
        {children}
      </CounterContext.Provider>
      {state.loading && <Loading></Loading>}
    </>
  );
};

export const useAppContext = () => useContext(CounterContext)