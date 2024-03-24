import instance from '@/api/index';
import { ReportType } from '@/types/report';

export const getReportList = async () => {
  const { data } = await instance.get<ReportType>('/reports/');

  return data;
};

export const createReportBlock = async (reportId: number) => {
  await instance.post(`/reports/${reportId}/`);
};

export const updateCheerTalkUnblock = async (cheerTalkId: number) => {
  await instance.put(`/reports/cheer-talk/${cheerTalkId}/`);
};

export const createReportUnPending = async (reportId: number) => {
  await instance.post(`/reports/invalid/${reportId}/`);
};
