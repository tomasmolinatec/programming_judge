import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Problem,
  ProblemDocument,
  ProblemShort,
} from './schemas/problem-schema';
import { Model } from 'mongoose';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel(Problem.name) private problemsModel: Model<ProblemDocument>,
  ) {}
  async GetAllProblems(): Promise<ProblemShort[]> {
    const problems = await this.problemsModel
      .find()
      .select('_id title difficulty')
      .exec();
    return problems;
  }

  async GetProblemById(id: string): Promise<Problem> {
    const problem = await this.problemsModel.findOne({ _id: id }).exec();

    if (!problem) throw new NotFoundException('Problem id not found.');
    return problem;
  }
}
