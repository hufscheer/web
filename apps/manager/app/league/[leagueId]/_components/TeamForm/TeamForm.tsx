import {
  AddIcon,
  CancelIcon,
  DeleteForeverOutlineIcon,
  FilterHdrIcon,
} from '@hcc/icons';
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
import { SubmitHandler, useFieldArray, UseFormReturn } from 'react-hook-form';

import * as styles from './TeamForm.css';
import { TeamFormSchema } from './types';

type TeamFormProps = {
  methods: UseFormReturn<TeamFormSchema>;
  submitText: string;
  onSubmit: SubmitHandler<TeamFormSchema>;
};

export const TeamForm = ({ methods, submitText, onSubmit }: TeamFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'players',
  });

  const handleImageRemove = () => {
    methods.setValue('logo', '');
  };

  const handleAddPlayer = () => {
    append({ name: '', number: '0' });
  };

  return (
    <Form {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <h3 className={styles.formTitle}>팀 정보</h3>
        <div className={styles.innerFormContainer}>
          <FormField
            control={methods.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <div className={styles.logoInputItem}>
                  <Uploader onChange={file => field.onChange(file)}>
                    {src => (
                      <span className={styles.logoContainer}>
                        <Icon
                          source={FilterHdrIcon}
                          color="gray"
                          width={40}
                          height={40}
                        />
                        {field.value && (
                          <span
                            className={styles.logo}
                            style={{
                              backgroundImage: `url(${
                                typeof field.value === 'string'
                                  ? field.value
                                  : src
                              })`,
                            }}
                          />
                        )}
                      </span>
                    )}
                  </Uploader>
                  <Badge colorScheme="red" asChild>
                    <button type="button" onClick={handleImageRemove}>
                      <Icon
                        source={DeleteForeverOutlineIcon}
                        size="xs"
                        color="white"
                      />
                      이미지 삭제
                    </button>
                  </Badge>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="name"
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

        <div className={styles.playerTitleContainer}>
          <h3 className={styles.formTitle}>선수</h3>
          <Badge
            className={styles.playerAddBadge}
            colorScheme="secondary"
            color="black"
            asChild
          >
            <button type="button" onClick={handleAddPlayer}>
              <Icon source={AddIcon} size="xs" color="black" />
              선수 추가
            </button>
          </Badge>
        </div>
        {fields.length > 0 && (
          <ul className={styles.playerList}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.playerItem}>
                <FormField
                  control={methods.control}
                  name={`players.${index}.name`}
                  render={({ field }) => (
                    <FormItem className={styles.playerNameInput}>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name={`players.${index}.number`}
                  render={({ field }) => (
                    <FormItem className={styles.playerNumberInput}>
                      <FormLabel>번호</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button type="button" onClick={() => remove(index)}>
                  <Icon source={CancelIcon} size="md" color="red" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <Button type="submit" fullWidth>
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
