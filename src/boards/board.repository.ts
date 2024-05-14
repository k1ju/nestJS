import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/createBoardDto";
import { User } from "src/auth/User.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    //이부분다시듣기
    constructor(private dataSource: DataSource)
    {
        super(Board, dataSource.createEntityManager());
    }

    //게시글생성
    async createBoard(createBoardDto: CreateBoardDto, user: User){
        const {title, description} = createBoardDto;

        const board = this.create({
        title,
        description,
        status: BoardStatus.PUBLIC,
        user: user
        })

        await this.save(board);
        return board;
    }

    //게시글삭제
    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.delete({id: id, user: user});
        if(result.affected === 0){
            throw new NotFoundException(`can't find board with id ${id}`)

        }
    }
}