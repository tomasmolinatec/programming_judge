import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestCaseDocument = TestCase & Document;

@Schema()
export class TestCase {

  @Prop({ required: true })
  id_problem: number;

  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  expected_result: string;

  @Prop({ required: true })
  time_limit: number;

  @Prop({ required: true })
  memory_limit: number;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCase);