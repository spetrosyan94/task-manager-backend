import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @ManyToOne(() => User, (user) => user.supervisor)
  supervisor: User;

  //   @Column({ nullable: true }) // Make supervisor nullable
  //   supervisorId: number; // Use supervisorId as the foreign key

  //   @ManyToOne(() => User, (user) => user.tasks) // Specify the inverse side
  //   supervisor: User;

  @OneToMany(() => Task, (task) => task.executor)
  tasks: Task[];
}
