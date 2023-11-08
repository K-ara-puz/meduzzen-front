export interface GeneralResponse extends Response{
  status_code: number, 
  result: string,
  detail?: object | string,
  error?: object
}