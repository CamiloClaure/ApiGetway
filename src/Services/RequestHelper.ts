import axios from "axios";
import {User} from "../models/User";


export async function makeHttpRequest<T>(url: string): Promise<T> {
    const { data } =  await axios.get<T>(url)
    return data
}