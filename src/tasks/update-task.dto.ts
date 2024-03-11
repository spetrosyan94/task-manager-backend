import { priority, status } from './task.entity';

export class UpdateTaskDto {
  title: string;
  description: string;
  priority: priority;
  status: status;
  executor: string | null;
  completedDate: Date | null;
}
