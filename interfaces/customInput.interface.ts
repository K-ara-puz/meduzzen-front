import { ChangeEvent, ChangeEventHandler } from "react";

export interface customInput {
  name?: string,
  value: string,
  type: string,
  afterChange: (event: ChangeEvent<HTMLInputElement>) => void,
  label?: string
}