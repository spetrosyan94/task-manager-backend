import { priority } from './task.entity';

export class CreateTaskDto {
  title: string;
  description: string;
  priority: priority;
  completedDate?: Date;
  executor?: string;
}
