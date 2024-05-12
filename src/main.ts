import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {
  let board = await prisma.board.create({data:{id:'1', title:'title', description:'content'}});
  console.log(board);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
