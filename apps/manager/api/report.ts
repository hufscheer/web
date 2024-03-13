import instance from '@/api/index';
import { ReportType } from '@/types/report';

export const getReports = async () => {
  const { data } = await instance.get<ReportType>('/reports/');

  return data;
};

export const postReport = async (cheerTalkId: number) => {
  await instance.post(`/reports/cheer-talk/${cheerTalkId}`);
};
