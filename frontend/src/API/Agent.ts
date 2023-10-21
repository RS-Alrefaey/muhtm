import axios, { AxiosResponse } from "axios";
import {TableRow} from "../comps/Table";



export type UserType = {
    first_name: string;
    phone_number: string;
    username: string;
    email: string;
    password: string;
    password2: string;
}

type SignupResponseType = {
    user: UserType;
    token: string;
  };

export type LoginDataType = {
    username: string;
    password: string;
}

export type UploadDatasetType = {
    user: string;    
    dataset: File | null;
    date?: string;   
    store_category: 'CLOTHES' | 'ELECTRONIC';
}

export type BarChartArrayType = [
    size_positive: number,
    size_negative: number,
    color_positive: number,
    color_negative: number,
    style_positive: number,
    style_negative: number,
    fabric_positive: number,
    fabric_negative: number,

    
    general_positive: number ,
    general_negative: number, 
    total_reviews: number ,
];

export type MainDashDisplayType = {
    has_previous_analysis: boolean;
    analysis_data: BarChartArrayType;
    analysis_date: Date;
}


//list of records
export type HistoryListType = {
    date: Date;
    results: {
        [key: string]: number; }
    analysis_type : string;
    user_id: string;
}


axios.defaults.baseURL = "http://localhost:8000/";



axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

const response = <T>(response: AxiosResponse<T>) => response.data

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(response),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(response),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(response),
    delete: <T>(url: string) => axios.delete<T>(url).then(response),
}

// API endpoints 
const User = {
    signup: (userData: UserType) => request.post<SignupResponseType>('user/signup/', userData),
    login: (loginData: LoginDataType) => request.post<{ token: string, hasPreviousRecord: boolean }>('user/login/', loginData),
    profile : () => request.get<UserType>('user/profile/'),
    update: (userData: UserType) => request.put<UserType>('user/update/', userData)
}

const DashboardAPI = {
    upload: (formData: FormData) => request.post('dashboard/upload/', formData),
    historyList: () => request.get<TableRow[]>(`dashboard/history/`),
    history: (historyId: string) => request.get<HistoryListType>(`dashboard/details/${historyId}`),
    chart: (instanceId: string) => request.get<BarChartArrayType>(`dashboard/charts/${instanceId}`),
    hasPreviousAnalysis: () => request.get<MainDashDisplayType>('dashboard/hasAnalysis/'),
}

const agent = {
    DashboardAPI, User
}

export default agent;

