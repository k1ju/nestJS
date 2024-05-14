import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/createBoardDto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/User.entity';

@Injectable()
export class BoardsService {

  constructor(private boardRepository: BoardRepository){}

  //게시글생성하기
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
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
  async getAllBoard(user: User): Promise<Board[]> {
    const query = await this.boardRepository.createQueryBuilder('board');
    
    query.where('board.userId = :userId', {userId: user.id})

    const boards = await query.getMany();

    return boards;
  }

  //게시글삭제
  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({id: id, user: user});

    if(result.affected === 0){
      throw new NotFoundException(`can't find board with id ${id}`)
    }
  }

  //게시글 상태변경
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board =  await this.getBoardById(id);
    
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
