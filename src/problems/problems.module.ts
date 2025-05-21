import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Problem, ProblemSchema } from './schemas/problem-schema';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService],
  imports: [
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
  ],
  exports: [MongooseModule, ProblemsService],
})
export class ProblemsModule {}
