import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(id: string) {
    const settings = await this.prisma.setting.findUnique({
      where: { id },
    });

    // if (!settings) {
    //   // اگر تنظیمات وجود ندارد، یک رکورد جدید ایجاد کن
    //   return this.prisma.setting.create({
    //     data: { id },
    //   });
    // }

    return settings;
  }

  async updateSettings(id: string, dto: UpdateSettingsDto) {
    const existingSettings = await this.prisma.setting.findUnique({
      where: { id },
    });

    if (!existingSettings) {
      throw new NotFoundException('Settings not found');
    }

    return this.prisma.setting.update({
      where: { id },
      data: dto,
    });
  }
}
