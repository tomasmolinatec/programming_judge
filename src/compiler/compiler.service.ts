import { Injectable } from '@nestjs/common';

import { exec } from 'child_process';

@Injectable()
export class CompilerService {
  async Compile(filename: string, path: string) {;

    // Construct your compile command
    const cmd = `g++ "${path}" -o "executables/${filename}"`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        
        console.log('Error!');
        console.log(stderr);
      }
      
      else{
      console.log('SUCCESS!');
      }
    });
  }
}
