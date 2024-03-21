import instance from '@/api/index';
import { ReportType } from '@/types/report';

export const getReports = async () => {
  const { data } = await instance.get<ReportType>('/reports/');

  return data;
};

export const putReport = async (cheerTalkId: number) => {
  await instance.put(`/reports/cheer-talk/${cheerTalkId}/`);
};

export const postInvalidReport = async (reportId: number) => {
  await instance.post(`/reports/invalid/${reportId}/`);
};
