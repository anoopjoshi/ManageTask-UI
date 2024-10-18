
import { ITask } from './models';
import axios from 'axios';



const API_URL = 'https://localhost:7090/api/tasks';

export class Api {
    static async getTasks(): Promise<ITask[]> {
        const response = await axios.get(API_URL);
        return response.data;
    }

    static async addTask(task: ITask): Promise<ITask> {
        const response = await axios.post(API_URL, task);
        return response.data;
    }

    static async deleteTask(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
}