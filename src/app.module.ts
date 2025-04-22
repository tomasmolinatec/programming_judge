import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { CompilerModule } from './compiler/compiler.module';

@Module({
  imports: [UploadModule, CompilerModule],
})
export class AppModule {}
