import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, descripttion: string) {
    const board: Board = {
      id: uuid(),
      title,
      descripttion,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
