import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilter(filterDto : GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || 
            task.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto : CreateTaskDto): Task{
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.IN_PROGRESS,
        } 
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, newStatus: TaskStatus ): Task{
        const task = this.getTaskById(id);
        task.status = newStatus;
        return task;
    }
}


