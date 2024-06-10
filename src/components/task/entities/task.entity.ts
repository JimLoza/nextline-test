import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../types/task.type";
import { UserE } from "src/components/user/entities/user.entity";
import Joi from "joi";

@Entity({ name: "task" })
export class TaskE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.OPEN })
    status: TaskStatus;

    @Column({ transformer: { to: (value: Date) => value, from: (value: Date) => !value ? null : value.toLocaleString('en-US') } })
    dueDate: Date;

    @Column()
    comment: string;

    @Column()
    createdBy: number;

    @Column({ type: "simple-array" })
    tags: string[];

    @Column({ nullable: true })
    fileName?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => UserE, user => user.id)
    @JoinColumn({ name: 'createdBy' })
    user: UserE;

}
