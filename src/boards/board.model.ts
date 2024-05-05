export interface Board {
  id: string;
  title: string;
  descripttion: string;
  status: BoardStatus; //정의된 BoardStatus타입 이외의 값이 들어가면 에러
}

//타입을 정의해놓고쓴다
export enum BoardStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
