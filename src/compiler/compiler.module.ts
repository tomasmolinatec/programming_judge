import { Module } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { ExecuterService } from 'src/executer/executer.service';
import { ExecuterModule } from 'src/executer/executer.module';

@Module({
  providers: [CompilerService],
  exports: [CompilerService],
  imports: [ExecuterModule]
})
export class CompilerModule {}
