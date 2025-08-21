import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    username: string;

    @Column({ type: "varchar", length: 100 })
    password: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}