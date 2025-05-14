import { Module } from '@nestjs/common';
import { ExecuterService } from './executer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestCase, TestCaseSchema } from './schemas/test_cases.schema';

@Module({
  providers: [ExecuterService],
  exports: [ExecuterService],
  imports:[MongooseModule.forFeature([{ name: TestCase.name, schema: TestCaseSchema }])]
})
export class ExecuterModule {}
