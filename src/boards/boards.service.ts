import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/createBoardDto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

  constructor(private boardRepository: BoardRepository){}

  //게시글생성하기
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  //게시글보기
  async getBoardById(id:number): Promise<Board> {
    const found = await this.boardRepository.findOne({where:{id:id}});

    if(!found){
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found
  }

  //게시글 전체보기
  async getAllBoards():Promise<Board[]>{
    return await this.boardRepository.find();
  }

  //게시글삭제
  deleteBoard(id: number) {
    this.boardRepository.deleteBoard(id);
  }

  //게시글 상태변경
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board =  await this.getBoardById(id);
    
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
