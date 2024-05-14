import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/User.entity";
import { userInfo } from "os";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(() => User, (user) => user.board, {eager: false})
    user: User
}