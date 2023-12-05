export interface GeneralResponse<T> extends Response{
  status_code: number, 
  result: string,
  detail?: T,
  error?: object
}