import { ReportProviders } from './application/report.constants';
import { HistoryModel } from './infraestructure/db/history.model';
import { HistoryRepository } from './infraestructure/db/history.repository';

export const historiesProviders = [
  {
    provide: ReportProviders.Model,
    useValue: HistoryModel,
  },
  {
    provide: ReportProviders.Repository,
    useValue: HistoryRepository,
  },
];
