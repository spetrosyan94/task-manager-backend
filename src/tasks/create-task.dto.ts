import { priority } from './task.entity';

export class CreateTaskDto {
  title: string;
  description: string;
  priority: priority;
  // status: status;
  executor?: string;
}
