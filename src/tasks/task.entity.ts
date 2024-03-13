import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
}

export enum status {
  CREATED = 'CREATED',
  PROGRESS = 'PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'date', nullable: true })
  completedDate: Date | null = null;

  @Column({
    type: 'enum',
    enum: priority,
    default: priority.NORMAL,
  })
  priority: priority;

  @Column({
    type: 'enum',
    enum: status,
    default: status.CREATED,
  })
  status: status;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => User, { nullable: true })
  executor: User | null;
}
