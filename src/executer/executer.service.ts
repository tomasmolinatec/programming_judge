import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as util from 'util';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { TestCase, TestCaseDocument } from './schemas/test_cases.schema';
import { Model } from 'mongoose';

const execAsync = util.promisify(exec);

@Injectable()
export class ExecuterService {
    constructor(
        @InjectModel(TestCase.name) private testCaseModel: Model<TestCaseDocument>,
      ) {}

  async ExecuteTests(filename: string): Promise<void> {
    const tests = await this.testCaseModel.find().exec();

    for (let i = 0; i < tests.length; i++) {
      const { input, expected_result } = tests[i];
      const startTime = Date.now();

      const result = await this.Execute(filename, input);
      const duration = Date.now() - startTime;

      const normalizedResult = this.normalizeOutput(result);
      const normalizedExpected = this.normalizeOutput(expected_result);

      if (normalizedResult === normalizedExpected) {
        console.log(`Test ${i} passed in ${duration} ms`);
      } else {
        console.error(`Test ${i} failed in ${duration} ms
Input:    "${input}"
Expected: "${expected_result}"
Got:      "${result.trim()}"`);
      }
    }
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
}




// import { Injectable } from '@nestjs/common';

// import { exec } from 'child_process';
// import * as util from 'util';
// const execAsync = util.promisify(exec);

// @Injectable()
// export class ExecuterService {


// async ExecuteTests(filename: string)
// {

//     // CONSEGUIR DE MONGO
//     const tests = [{input: "5 2", expected: "11"},
//     {input: "5 2", expected: "11"},
// ]

//     for (let i = 0; i < tests.length; i++)
//     {
//         const startTime = Date.now();
//         const result = await this.Execute(filename, tests[i].input)
//         const finishTime = Date.now();

//         if (result === tests[i].expected)
//         {
//             console.log(`Test ${i} completed succesfully in ${finishTime-startTime} ms!`)
//         }
//         else{
//             console.log(`Test ${i} failed in ${finishTime-startTime} ms!`)
//         }
//     }

//     }


//   async Execute(filename:string, input : string) {

//     const execCmd = `echo ${input} | ./executables/${filename}`;
//     // console.log(execCmd);

//     const { stdout: out, stderr: error } = await execAsync(execCmd);

//     if (error) {
//       console.log('Error: ', error);
//     } else {
//     //   console.log(out);
//     }

//     return out;
//   }
// }
