import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "task" })
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "boolean", default: false })
    completed: boolean;

    @ManyToOne(() => User, user => user.tasks, { onDelete: "CASCADE" })
    user: User;
}