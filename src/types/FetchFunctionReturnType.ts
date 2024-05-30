export type FetchFunctionResult = {
  isSuccess: boolean;
  error?: FetchFunctionError;
};
export type FetchFunctionError = {
  statusCode: number;
  message?: string;
};
