import instance from '@/api';
import { AuthPayload, AuthType } from '@/types/auth';

export const postLogin = async (body: AuthPayload) => {
  const { data } = await instance.post<AuthType>('/accounts/login/', body);

  return data;
};

export const postGameStatus = async (id: number, gameStatus: string) => {
  instance.post(`/manage/game/statustype/${id}/`, { gameStatus });
};

export const checkPermission = async () => {
  const { data } = await instance.get<number>('/accounts/permission/');
  if (data === 400) {
    throw new Error('해당 페이지에 접근할 권한이 없습니다');
  }
  return;
};
