import { Module } from '@nestjs/common';
import { ReportController } from './application/report.controller';
import { ReportService } from './application/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
