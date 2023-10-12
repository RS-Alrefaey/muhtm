import axios, { AxiosResponse } from "axios";


export type UserType = {
    first_name: string;
    last_name: string;
    phone_number: string;
    username: string;
    email: string;
    store_link: string;
    password: string;
    password2: string;
}

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

// indisual record
export type HistoryType = {
    analysis_id: string;
    user_id: string;
    date: Date;
    results: {
        [key: string]: number;
    }
}

//list of records
export type HistoryListType = {
    user_id: string;
    history: HistoryType [];  
}


// This is a TypeScript type definition. It helps us understand and 
// control the shape of our data. DashboardDataType has two properties: 
// data which is an array of strings, and user which is an object with a username and password.


axios.defaults.baseURL = "http://localhost:8000/";

if (localStorage.getItem('authToken')) {
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;
}


const response = <T>(response: AxiosResponse<T>) => response.data
// This is a utility function named response. It takes an axios response 
// object and simply returns the data from it. This is useful because when we make 
// requests, most of the time we're only interested in the data part of the response.


const request = {
    get: <T>(url: string) => axios.get<T>(url).then(response),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(response),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(response),
    delete: <T>(url: string) => axios.delete<T>(url).then(response),
}
// We're defining an object named request. It contains methods (get, post, put, delete) that represent different HTTP request methods.
// These methods are generic, meaning they can work with any data type.
// Each method makes an axios request and then extracts the data using our response utility function.



// API endpoints 
const User = {
    signup: (userData: UserType) => request.post<UserType>('user/signup/', userData),
    login: (loginData: LoginDataType) => request.post<{ token: string }>('user/login/', loginData),
    Nlogin: (loginData: LoginDataType) => request.post<{ token: string, has_dataset: boolean }>('user/login/', loginData),
    profile : () => request.get<UserType>('user/profile/'),
    update: (userData: UserType) => request.post<UserType>('user/update/', userData)
}

const DashboardAPI = {
    upload: (formData: FormData) => request.post('dashboard/upload/', formData),
    historyList: (historyId: string) => request.get<HistoryListType>(`dashboard/history/${historyId}`),
}

const agent = {
    DashboardAPI, User
}

export default agent;

// list: (id: string) => request.get<DashboardDataType>(`dashbord/blablabla/${id}`),
