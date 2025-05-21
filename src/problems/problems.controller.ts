import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}
  @Get()
  async getProblems() {
    return await this.problemsService.GetAllProblems();
  }

  @Get(':id')
  async getProblemsById(@Param('id') id: string) {
    return await this.problemsService.GetProblemById(id);
  }
}
