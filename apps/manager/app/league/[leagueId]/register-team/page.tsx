'use client';

import { AddIcon, DeleteForeverOutlineIcon, FilterHdrIcon } from '@hcc/icons';
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Uploader,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { leagueFormSchema } from '@/app/league/_components/LeagueForm';
import Layout from '@/components/Layout';

import * as styles from './page.css';

// type PageProps = {
//   params: { leagueId: string };
// };

const teamFormSchema = z.object({
  teamLogo: z.union([
    z.string().min(1, { message: '팀 로고를 입력해주세요' }),
    z.instanceof(File),
    z.undefined(),
  ]),
  teamName: z.string().min(1, { message: '팀명을 입력해주세요' }),
});

type TeamFormSchema = z.infer<typeof teamFormSchema>;

const teamDefaultValues = {
  teamLogo: undefined,
  teamName: '',
};

export default function Page() {
  // const leagueId: string = params.leagueId;

  const methods = useForm<TeamFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: teamDefaultValues,
  });

  const handleImageRemove = () => {
    methods.setValue('teamLogo', undefined);
  };

  return (
    <Layout navigationTitle="새로운 팀 추가">
      <Form {...methods}>
        <form className={styles.form}>
          <h3 className={styles.formTitle}>팀 정보</h3>
          <div className={styles.innerFormContainer}>
            <FormField
              control={methods.control}
              name="teamLogo"
              render={({ field }) => (
                <FormItem className={styles.logoInputItem}>
                  <Uploader onChange={file => field.onChange(file)}>
                    {src => (
                      <span className={styles.logoContainer}>
                        <Icon
                          source={FilterHdrIcon}
                          color="gray"
                          width={40}
                          height="auto"
                        />
                        <span
                          className={styles.logo}
                          style={{ backgroundImage: `url(${src})` }}
                        />
                      </span>
                    )}
                  </Uploader>
                  <Badge colorScheme="alert" asChild>
                    <button type="button" onClick={handleImageRemove}>
                      <Icon
                        source={DeleteForeverOutlineIcon}
                        size="xs"
                        color="white"
                      />
                      이미지 삭제
                    </button>
                  </Badge>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>팀 이름</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className={styles.formTitle}>선수</h3>
        </form>
      </Form>

      <Button
        className={styles.button}
        colorScheme="secondary"
        fontWeight="semibold"
      >
        <Icon source={AddIcon} size="md" color="black" />
        선수 추가
      </Button>
    </Layout>
  );
}
