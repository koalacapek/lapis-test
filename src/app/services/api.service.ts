import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Task } from '../utils/type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://mavotz8a8g.execute-api.ap-southeast-2.amazonaws.com';

  constructor(private http: HttpClient) {}

  // Get all tasks for a user
  async getTasks(): Promise<Task[] | undefined> {
    return await firstValueFrom(this.http.get<Task[]>(`${this.apiUrl}/items`));
  }

  getUserTasks(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/user/${userId}`);
  }

  // Get a specific task by ID
  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/${taskId}`);
  }

  // Create a new task
  createTask(task: {
    taskId: string;
    userId: string;
    title: string;
    description?: string;
    deadline?: string;
    status: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/items`, task, { headers });
  }

  // Update a task
  updateTask(updates: {
    userId: string;
    taskId: string;
    title: string;
    description: string;
    deadline: string;
    status: string;
  }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/items`, updates, {
      headers,
    });
  }

  // Delete a task by ID
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${taskId}`);
  }
}
