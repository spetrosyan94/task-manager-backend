import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Task, status } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, author: User) {
    const task = this.taskRepository.create();
    task.description = createTaskDto.description;
    task.priority = createTaskDto.priority;
    task.status = status.CREATED;
    task.title = createTaskDto.title;
    task.author = author;
    task.completedDate = createTaskDto.completedDate ?? null;

    await this.taskRepository.save(task);
    return task;
  }

  async getAll() {
    return this.taskRepository.find({ relations: ['author', 'executor'] });
  }

  async getById(id: number) {
    return this.taskRepository.findOneByOrFail({ id });
  }

  executorAreEquals(dtoExec: string | null, taskExec: User | null): boolean {
    if (dtoExec === null && taskExec === null) return true;
    if (dtoExec === null && taskExec !== null) return false;
    if (dtoExec !== null && taskExec === null) return false;
    return Number(dtoExec) === taskExec.id;
  }

  async canUpdate(
    task: Task,
    updateDto: UpdateTaskDto,
    user: User,
  ): Promise<true | string> {
    // Если автор задачи наш руководитель
    const taskAuthorIsSupervisor = task.author.id === user.supervisor?.id;

    // и мы меняем какое-то свойство кроме статуса, возвращаем false
    const restrictedFieldsChanged =
      updateDto.completedDate !== task.completedDate ||
      updateDto.description !== task.description ||
      !this.executorAreEquals(updateDto.executor, task.executor) ||
      updateDto.priority !== task.priority ||
      updateDto.title !== task.title;

    if (taskAuthorIsSupervisor && restrictedFieldsChanged)
      return 'Пользователь не может обновлять задачу, так как она создана его руководителем';

    // Проверка, что executor из dto наш подчиненный
    if (
      !this.executorAreEquals(updateDto.executor, task.executor) &&
      updateDto.executor
    ) {
      const executor = await this.userRepository.findOne({
        where: { id: Number(updateDto.executor) },
        relations: ['supervisor'],
      });

      if (executor.supervisor?.id !== user.id)
        return 'Нельзя назначить исполнителем задачи не вашего подчиненного';
    }
    return true;
  }

  async update(id: number, dto: UpdateTaskDto, user: User) {
    const task = await this.taskRepository.findOneOrFail({
      where: { id },
      relations: ['author', 'executor'],
    });

    const canUpdate = await this.canUpdate(task, dto, user);

    // возращаем сообщение об ошибке, если проверка не пройдена
    if (canUpdate !== true) {
      throw new UnauthorizedException(canUpdate);
    }

    const executor = dto.executor
      ? await this.userRepository.findOneByOrFail({ id: Number(dto.executor) })
      : null;

    task.description = dto.description;
    task.priority = dto.priority;
    task.status = dto.status;
    task.title = dto.title;
    task.executor = executor;
    task.completedDate = dto.completedDate;

    this.taskRepository.save(task);
    return task;
  }
}
