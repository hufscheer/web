import { CalendarIcon } from '@hcc/icons';
import {
  Button,
  Calendar,
  Form,
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
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { formatTime } from '@/utils/time';

import * as styles from './LeagueForm.css';
import { LeagueFormSchema } from './types';

type LeagueFormProps = {
  methods: UseFormReturn<LeagueFormSchema>;
  submitText: string;
  onSubmit: SubmitHandler<LeagueFormSchema>;
};

export const LeagueForm = ({
  methods,
  submitText,
  onSubmit,
}: LeagueFormProps) => {
  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name="leagueName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>대회 이름</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>시작일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button colorScheme="outline" fullWidth justify="between">
                      <span>
                        {field.value
                          ? formatTime(field.value, 'YYYY년 MM월 DD일')
                          : ''}
                      </span>
                      <Icon source={CalendarIcon} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종료일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button colorScheme="outline" fullWidth justify="between">
                      <span>
                        {field.value
                          ? formatTime(field.value, 'YYYY년 MM월 DD일')
                          : ''}
                      </span>
                      <Icon source={CalendarIcon} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="round"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormLabel>진행 방식</FormLabel>
                <FormControl>
                  <SelectTrigger type="button">
                    <SelectValue>{field.value}강</SelectValue>
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

        <Button className={styles.button} type="submit" fullWidth>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
