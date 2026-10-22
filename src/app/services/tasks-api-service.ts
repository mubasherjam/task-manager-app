import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task-manager/task-manager';

@Injectable({
    providedIn: 'root'
})
export class TasksApiService
{
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = 'http://localhost:3000/tasks';

    getTasks(): Observable<Task[]>
    {
        return this.http.get<Task[]>(this.apiUrl);
    }
}
