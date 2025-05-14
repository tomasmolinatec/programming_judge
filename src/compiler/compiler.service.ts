import { Injectable } from '@nestjs/common';

import { exec } from 'child_process';
import { ExecuterService } from 'src/executer/executer.service';
import * as util from 'util';
const execAsync = util.promisify(exec);

@Injectable()
export class CompilerService {
  constructor(private readonly executerService: ExecuterService ){}


  async Compile(filename: string, path: string) {
    // Construct your compile command
    const compileCmd = `g++ "${path}" -o "executables/${filename}"`;

    const { stdout: out, stderr: error } = await execAsync(compileCmd);

    if (error) {
      console.log('Error: ', error);
    }
    else{
      this.executerService.ExecuteTests(filename);
    }
  }
}
