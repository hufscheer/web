import instance from '@/api';

type UserInfoType = {
  accessId: string;
  level: number;
  nickname: string;
};

type UserRankInfoType = {
  gameType: number;
  division: number;
  achievementDate: string;
};

export type FconlineInfoType = UserInfoType & UserRankInfoType;

export const getFconlinePlayerInfo = async (
  nickname: string,
): Promise<FconlineInfoType> => {
  const { data: userInfo } = await instance.get<UserInfoType>(
    `https://public.api.nexon.com/openapi/fconline/v1.0/users?nickname=${nickname}`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FCONLINE_KEY,
      },
    },
  );

  const { data: rankInfo } = await instance.get<UserRankInfoType[]>(
    `https://public.api.nexon.com/openapi/fconline/v1.0/users/${userInfo.accessId}/maxdivision`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FCONLINE_KEY,
      },
    },
  );

  return { ...userInfo, ...(rankInfo.pop() as UserRankInfoType) };
};
