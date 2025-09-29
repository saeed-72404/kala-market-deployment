import { Injectable, BadRequestException } from '@nestjs/common';
// import { File } from 'multer'; // Import Multer types
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // مسیر ذخیره‌سازی
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    // اگر نیاز به ذخیره در دیتابیس باشد
    const savedFile = await this.prisma.file.create({
      data: {
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: filePath,
      },
    });

    return {
      message: 'File uploaded successfully',
      file: savedFile,
    };
  }
}
