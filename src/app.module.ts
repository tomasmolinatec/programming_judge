import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { CompilerModule } from './compiler/compiler.module';
import { ExecuterModule } from './executer/executer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UploadModule, CompilerModule, ExecuterModule,
    MongooseModule.forRoot('mongodb://admin:secret@localhost:27777', {
  dbName: 'Judge',
})
]})
export class AppModule {}
