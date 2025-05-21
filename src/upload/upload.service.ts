import { Injectable, NotFoundException } from '@nestjs/common';
import { File } from '../utils/interfaces/file.interface';
import { SubmissionInterface } from '../utils/interfaces/submission.interface';
import { CompilerService } from 'src/compiler/compiler.service';
import { ProblemsService } from 'src/problems/problems.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly compilerService: CompilerService,
    private readonly problemsService: ProblemsService,
  ) {}

  async catchFile(file: File, id_problem: string) {
    if (!(await this.problemsService.GetProblemById(id_problem)))
      throw new NotFoundException('Invalid problem id');

    const submissionData: SubmissionInterface = {
      id_problem: id_problem,
      file: file,
    };

    return this.compilerService.Compile(submissionData);
  }
}
