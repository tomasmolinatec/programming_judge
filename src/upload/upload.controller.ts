import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompilerService } from 'src/compiler/compiler.service';
import { delay } from 'src/utils/delay';
import { File } from 'src/utils/interfaces/file.interface';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: File, @Param('id') id: string) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.uploadService.catchFile(file, id);
  }
}
