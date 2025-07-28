import { CalendarIcon } from '@hcc/icons';
import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hcc/ui';
import { UseFormReturn } from 'react-hook-form';

import { formatTime } from '@/utils/time';

import { LeagueFormSchema } from '../LeagueForm/types';

type LeagueNameProps = {
  methods: UseFormReturn<LeagueFormSchema>;
};

export const LeagueName = ({ methods }: LeagueNameProps) => {
  return (
    <FormField
      control={methods.control}
      name="leagueName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>명칭</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type LeagueRoundProps = {
  methods: UseFormReturn<LeagueFormSchema>;
};

export const LeagueRound = ({ methods }: LeagueRoundProps) => {
  return (
    <FormField
      control={methods.control}
      name="round"
      render={({ field }) => (
        <FormItem>
          <FormLabel>라운드</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger type="button">
                <SelectValue>{field.value || '선택된 데이터'}</SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="32">32강</SelectItem>
              <SelectItem value="16">16강</SelectItem>
              <SelectItem value="8">8강</SelectItem>
              <SelectItem value="4">4강</SelectItem>
              <SelectItem value="2">결승</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
type LeagueQuaterProps = {
  methods: UseFormReturn<LeagueFormSchema>;
};

export const LeagueQuater = ({ methods }: LeagueQuaterProps) => {
  return (
    <FormField
      control={methods.control}
      name="quarter"
      render={({ field }) => (
        <FormItem>
          <FormLabel>쿼터</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger type="button">
                <SelectValue>{field.value || '선택된 데이터'}</SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="시작 전">시작 전</SelectItem>
              <SelectItem value="전반">전반</SelectItem>
              <SelectItem value="후반">후반</SelectItem>
              <SelectItem value="승부차기">승부차기</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type LeagueStatusProps = {
  methods: UseFormReturn<LeagueFormSchema>;
};

export const LeagueStatus = ({ methods }: LeagueStatusProps) => {
  return (
    <FormField
      control={methods.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>상황</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger type="button">
                <SelectValue>{field.value || '선택된 데이터'}</SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="진행 중">진행 중</SelectItem>
              <SelectItem value="종료">종료</SelectItem>
              <SelectItem value="대기">대기</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type LeagueDateProps = {
  methods: UseFormReturn<LeagueFormSchema>;
};

export const LeagueDate = ({ methods }: LeagueDateProps) => {
  return (
    <FormField
      control={methods.control}
      name="startDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>시작 일시</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button colorScheme="outline" fullWidth justify="between">
                  <span>
                    {(field.value && formatTime(field.value, 'YYYY년 MM월 DD일 HH:mm')) || ''}
                  </span>
                  <Icon source={CalendarIcon} />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar defaultValue={field.value} onChange={field.onChange} />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
