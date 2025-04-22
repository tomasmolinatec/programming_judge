import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompilerService } from 'src/compiler/compiler.service';

@Controller()
export class UploadController {
  constructor(
    private readonly appService: UploadService,
    private readonly compilerService: CompilerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name in the form-data
  uploadSingle(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    // file has been saved to diskStorage destination
    // file.filename, file.path, file.mimetype, etc. are available
    // console.log(file)

    this.compilerService.Compile(file.filename, file.path);

    return "Submission Accepted!\n"
  }
}
