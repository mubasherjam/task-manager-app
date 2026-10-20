import { Injectable, inject } from '@angular/core';
import { TasksService } from './tasks-service';

@Injectable({
    providedIn: 'root'
})

export class StatisticsService
{
    private tasksService: TasksService = inject(TasksService);

    
    getCompletedTasksCount(): number
    {
        return this.tasksService.getTasks().filter(task => task.status === 'completed').length;
    }

    getPendingTasksCount(): number
    {
        return this.tasksService.getTasks().filter(task => task.status === 'pending').length;
    }

    getOverdueTasksCount(): number
    {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.tasksService.getTasks().filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
    }

    getCompletionRate(): number
    {
        const tasks = this.tasksService.getTasks();
        if (tasks.length == 0) return 0;

        const completed = this.getCompletedTasksCount();
        const total = tasks.length;
        return Math.round((completed / total) * 100);
    }

    getProductivityLevel(): string
    {
        const completionRate = this.getCompletionRate();
        if (completionRate >= 80)
        {
            return 'Excellent';
        }
        else if (completionRate >= 60)
        {
            return 'Good';
        }
        else if (completionRate >= 40)
        {
            return 'Needs Improvement';
        }
        else
        {
            return 'Poor';
        }
    }
}
