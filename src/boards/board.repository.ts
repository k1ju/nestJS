import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource)
    {
        super(Board, dataSource.createEntityManager());
    }

    //게시글생성
    async createBoard(createBoardDto){
    
        const {title, description} = createBoardDto;

        const board = await this.create({
        title,
        description,
        status: BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    
    }

    //게시글삭제
    async deleteBoard(id: number): Promise<void>{
        
        const result = await this.delete({id: id});
        console.log(result);
    }
}