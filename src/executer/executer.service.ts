import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import * as util from 'util';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { TestCase, TestCaseDocument } from './schemas/test_cases.schema';
import { Model } from 'mongoose';
import { SubmissionInterface } from 'src/utils/interfaces/submission.interface';
import { ResponseInterface } from 'src/utils/interfaces/response.interface';

const execAsync = util.promisify(exec);

@Injectable()
export class ExecuterService {
  constructor(
    @InjectModel(TestCase.name) private testCaseModel: Model<TestCaseDocument>,
  ) {}

  async ExecuteTests(submission: SubmissionInterface): Promise<ResponseInterface> {
    const filename = submission.file.filename;
    const id_problem = submission.id_problem;
    const tests = await this.testCaseModel
      .find({ id_problem: id_problem })
      .exec();


    // console.log(tests);
    const res: ResponseInterface = {
      status: 'Passed all tests!',
      testcases: [],
    };
    let passedAll = true;
    for (let i = 0; i < tests.length; i++) {
      const { input, expected_result, _id } = tests[i];
      
      
      if (!(_id && typeof _id === "object")) // TS NARROWING
      throw new InternalServerErrorException("THIS")
      const id = _id.toString();
      
    
      const {result, time} = await this.ExecutewithTime(filename, input);
    

      const normalizedResult = this.normalizeOutput(result);
      const normalizedExpected = this.normalizeOutput(expected_result);

      if (normalizedResult === normalizedExpected) {
        res.testcases!.push({
          id: id,
          status: 'Passed',
          input: input,
          expected: normalizedExpected,
          output: normalizedResult,
        });
      } else {
        passedAll = false;
        res.testcases!.push({
          id: id,
          status: 'Failed',
          input: input,
          expected: normalizedExpected,
          output: normalizedResult,
        });
      }
      console.log(`Test ${i} took ${time} ms`);
    }

    if (!passedAll)
    {
      res.status = "Failed."
    }

    return res;
  }

  private normalizeOutput(output: string): string {
    return output.trim().replace(/\s+/g, ' ');
  }

  async Execute(filename: string, input: string): Promise<string> {
    const command = `echo ${input} | ./executables/${filename}`;

    try {
      const { stdout } = await execAsync(command);
      return stdout;
    } catch (error: any) {
      console.error(`Execution failed: ${error.message || error}`);
      return '__ERROR__';
    }
  }

  async ExecutewithTime(filename: string, input: string): Promise<{result: string, time: number}> {
    const command = `time echo ${input} | ./executables/${filename}`;

    try {
      const {stdout: result, stderr} = await execAsync(command);
      const i1 = stderr.indexOf("user");
      const i2 = stderr.indexOf("sys");
      const raw = stderr.slice(i1+4,i2)
      
      const duration = this.parseTimeString(raw);

      return {result: result, time: duration};
    } catch (error: any) {
      console.error(`Execution failed: ${error.message || error}`);
     throw new InternalServerErrorException(error);
    }
  }

  parseTimeString(s: string): number {
    s = s.trim()
    const re = /^(\d+)m([\d.]+)s$/;             
    const match = re.exec(s);                 
  
    if (!match) {
      throw new InternalServerErrorException(`Bad format: '${s}' (expected XmY.Ys)`);
    }
  
    const minutes = Number(match[1]);         
    const seconds = Number(match[2]);
  
    return minutes * 60_000 + seconds * 1_000;
  }

}


