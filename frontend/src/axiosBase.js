import axios from 'axios';
import {urlApi} from "./constants";

export const axiosBase = axios.create({
    baseURL: urlApi
});