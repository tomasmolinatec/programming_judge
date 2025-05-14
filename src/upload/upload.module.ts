import { BadRequestException, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
// uploads.module.ts
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CompilerModule } from 'src/compiler/compiler.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // folder to save to
        filename: (req, file, cb) => {
          // generate a unique filename
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalExt = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${originalExt}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        // console.log('Uploaded file extension:', ext);
        if (ext !== '.cpp') {
          return cb(
            new BadRequestException('Only cpp files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
    CompilerModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
