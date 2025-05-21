import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/** ---------- Sub-document ---------- */
@Schema({ _id: false }) // no own _id for each sample
export class Sample {
  @Prop({ required: true }) input!: string;
  @Prop({ required: true }) output!: string;
}
const SampleSchema = SchemaFactory.createForClass(Sample);

/** ---------- Root document ---------- */
export type ProblemDocument = Problem & Document;

@Schema({ collection: 'problems' })
export class Problem {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  difficulty!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  inputSpec!: string;

  @Prop({ required: true })
  outputSpec!: string;

  @Prop({ type: [SampleSchema], required: true })
  samples!: Sample[];
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);

export class ProblemShort {
  title!: string;

  difficulty!: string;
}
