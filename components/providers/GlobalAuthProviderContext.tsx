'use client'
import { createContext } from "react";

export const GlobalAuthContext = createContext({user: {}, isAuth: null})