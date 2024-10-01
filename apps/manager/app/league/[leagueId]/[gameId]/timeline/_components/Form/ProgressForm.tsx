import { useCreateProgressTimeline } from '@hcc/api';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  getProgressTypeByQuarter,
  QUARTER_ID,
  QUARTER_KEY,
  QUARTERS_DB,
} from '@/constants/games';

import * as styles from './styles.css';
import {
  progressDefaultValues,
  progressFormSchema,
  ProgressFormSchema,
} from '../../_types';

type ProgressFormProps = {
  gameId: string;
  onClose?: () => void;
};

const ProgressForm = ({ gameId, onClose }: ProgressFormProps) => {
  const { toast } = useToast();
  const methods = useForm<ProgressFormSchema>({
    resolver: zodResolver(progressFormSchema),
    defaultValues: progressDefaultValues,
  });

  const { mutate: createProgressTimelineMutation, isPending } =
    useCreateProgressTimeline();

  const onSubmit = (data: ProgressFormSchema) => {
    if (isPending)
      return toast({
        title: '경기 상태를 변경 중입니다. 잠시만 기다려주세요.',
        variant: 'destructive',
      });

    createProgressTimelineMutation(
      {
        gameId,
        recordedAt: Number(data.recordedAt),
        recordedQuarterId: QUARTER_ID[data.recordedQuarterId as QUARTER_KEY],
        gameProgressType: getProgressTypeByQuarter(
          data.recordedQuarterId as QUARTER_KEY,
        ),
      },
      {
        onSuccess: () => {
          methods.reset();
          if (onClose) onClose();
        },
      },
    );
  };

  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h4 className={styles.sectionTitle}>상태</h4>
        <section className={styles.section}>
          <FormField
            control={methods.control}
            name="recordedQuarterId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormLabel>쿼터</FormLabel>
                  <FormControl>
                    <SelectTrigger type="button">
                      <SelectValue>
                        {QUARTERS_DB[field.value as QUARTER_KEY]}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(QUARTERS_DB).map(([quarter, value]) => (
                      <SelectItem key={quarter} value={quarter}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" fontWeight="semibold" fullWidth>
          타임라인 등록
        </Button>
      </form>
    </Form>
  );
};

export default ProgressForm;
