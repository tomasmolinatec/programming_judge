import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { ExecuterService } from 'src/executer/executer.service';
import { ResponseInterface } from 'src/utils/interfaces/response.interface';
import { SubmissionInterface } from 'src/utils/interfaces/submission.interface';
import * as util from 'util';
const execAsync = util.promisify(exec);

@Injectable()
export class CompilerService {
  constructor(private readonly executerService: ExecuterService) {}

  async Compile(submission: SubmissionInterface): Promise<ResponseInterface> {
    const path = submission.file.path;
    const filename = submission.file.filename;

    const compileCmd = `g++ "${path}" -o "executables/${filename}"`;

    try {
      const { stdout, stderr } = await execAsync(compileCmd);
      // if (stderr) {
      //   return { status: `Compiled with warnings:\n${stderr}` };
      // }
      
    } catch (err: any) {
      // err.stderr contains the compiler diagnostics
      console.log(`Compile error:\n${err.stderr || err.message}`)
      return { status: "Compile Error.", error:`${err.stderr || err.message}` };
    }

    return await this.executerService.ExecuteTests(submission);
  }
}
