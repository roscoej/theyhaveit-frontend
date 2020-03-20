import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const BaseURL = "https://weyfxah0l3.execute-api.us-east-1.amazonaws.com/prod/api";

const ApiRequest = (opts: AxiosRequestConfig) => new Promise<AxiosResponse>((resolve, reject) => {
    axios({...opts, baseURL: BaseURL}).then((res: AxiosResponse) => resolve(res)).catch((err: AxiosError) => reject(err));
});

export default ApiRequest;