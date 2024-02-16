import { ChangeEvent, ChangeEventHandler } from "react";

export interface CustomInput {
  name?: string,
  value: string,
  type: string,
  afterChange: (event: ChangeEvent<HTMLInputElement>) => void,
  label?: string
}