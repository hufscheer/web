import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Toaster,
  toast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta = {
  title: '@hcc/Form',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFormSchema = z.object({
  name: z.string().min(2, { message: '이름은 2글자 이상이어야 합니다.' }),
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
});

const defaultValues = {
  name: '',
  email: '',
};

type FormSchema = z.infer<typeof defaultFormSchema>;

export const Default: Story = {
  render: () => {
    const methods = useForm<FormSchema>({
      resolver: zodResolver(defaultFormSchema),
      defaultValues,
      mode: 'onSubmit',
    });

    const onSubmit = (data: FormSchema) => {
      toast({
        title: data.name,
        description: data.email,
      });
    };

    return (
      <>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <FormField name="name">
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormField>

            <FormField name="email">
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormField>

            <button
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#141B21',
                color: '#fff',
                borderRadius: 8,
                paddingBlock: 16,
                marginTop: 8,
              }}
            >
              버튼
            </button>
          </form>
        </Form>

        <Toaster />
      </>
    );
  },
};

const signupFormSchema = z.object({
  id: z.string().email({ message: '아이디는 이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8글자 이상이어야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/, {
      message: '영문자 혹은 특수문자를 포함해야 합니다.',
    }),
});

const signupValues = {
  id: '',
  password: '',
};

type SignupFormSchema = z.infer<typeof signupFormSchema>;

export const Signup: Story = {
  render: () => {
    const methods = useForm<SignupFormSchema>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: signupValues,
      mode: 'onSubmit',
    });

    const onSubmit = (data: SignupFormSchema) => {
      toast({
        title: '입력한 값은',
        description: `id: ${data.id}, password: ${data.password}입니다.`,
      });
    };

    return (
      <>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <FormField name="id">
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormField>

            <FormField name="password">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" />
              </FormControl>
              <FormMessage />
            </FormField>

            <button
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#141B21',
                color: '#fff',
                borderRadius: 8,
                paddingBlock: 16,
                marginTop: 8,
              }}
            >
              회원가입
            </button>
          </form>
        </Form>

        <Toaster />
      </>
    );
  },
};

const onChangeFormSchema = z.object({
  id: z.string().email({ message: '아이디는 이메일 형식으로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8글자 이상이어야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/, {
      message: '영문자 혹은 특수문자를 포함해야 합니다.',
    }),
});

const onChangeValues = {
  id: '',
  password: '',
};

type OnChangeFormSchema = z.infer<typeof onChangeFormSchema>;

export const OnChangeForm: Story = {
  render: () => {
    const methods = useForm<OnChangeFormSchema>({
      resolver: zodResolver(onChangeFormSchema),
      defaultValues: onChangeValues,
      mode: 'onChange',
    });

    const onSubmit = (data: OnChangeFormSchema) => {
      toast({
        title: '입력한 값은',
        description: `id: ${data.id}, password: ${data.password}입니다.`,
      });
    };

    return (
      <>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <FormField name="id">
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormMessage />
            </FormField>

            <FormField name="password">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" />
              </FormControl>
              <FormMessage />
            </FormField>

            <button
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#141B21',
                color: '#fff',
                borderRadius: 8,
                paddingBlock: 16,
                marginTop: 8,
              }}
            >
              회원가입
            </button>
          </form>
        </Form>

        <Toaster />
      </>
    );
  },
};

const managerFormSchema = z.object({
  TEAM_NAME: z.string().min(1, { message: '팀명을 입력해주세요.' }),
  PLAYER: z.string().min(1, { message: '선수를 선택해주세요.' }),
  QUARTER: z.string().min(1, { message: '쿼터를 선택해주세요.' }),
});

const managerFormValues = {
  TEAM_NAME: '경영 바바예투',
  PLAYER: '',
  QUARTER: '',
};

type ManagerFormSchema = z.infer<typeof managerFormSchema>;

export const ManagerForm: Story = {
  render: () => {
    const methods = useForm<ManagerFormSchema>({
      resolver: zodResolver(managerFormSchema),
      defaultValues: managerFormValues,
      mode: 'onSubmit',
    });

    const handleChange = (target: keyof ManagerFormSchema, value: string) => {
      methods.setValue(target, value, { shouldDirty: true });
    };

    const onSubmit = (data: ManagerFormSchema) => {
      toast({
        title: '입력한 값은',
        description: `팀명: ${data.TEAM_NAME}, 선수: ${data.PLAYER}, 쿼터: ${data.QUARTER}입니다.`,
      });
    };

    return (
      <>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <h2>상황</h2>
            <FormField name="TEAM_NAME">
              <FormLabel>팀명</FormLabel>
              <FormControl>
                <Input readOnly />
              </FormControl>
              <FormMessage />
            </FormField>

            <h2>득점 상세 정보</h2>

            <FormField name="PLAYER">
              <Select
                onValueChange={value => handleChange('PLAYER', value)}
                defaultValue={methods.getValues('PLAYER')}
              >
                <FormLabel>선수</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>득점</SelectLabel>
                    <SelectItem value="강아지">강아지</SelectItem>
                    <SelectItem value="고양이">고양이</SelectItem>
                    <SelectItem value="푸바오">푸바오</SelectItem>
                    <SelectItem value="짱구">짱구</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormField>

            <FormField name="QUARTER">
              <Select
                onValueChange={value => handleChange('QUARTER', value)}
                defaultValue={methods.getValues('QUARTER')}
              >
                <FormLabel>쿼터</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>쿼터</SelectLabel>
                    <SelectItem value="16">16강</SelectItem>
                    <SelectItem value="8">8강</SelectItem>
                    <SelectItem value="4">4강</SelectItem>
                    <SelectItem value="2">결승</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormField>

            <button
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#141B21',
                color: '#fff',
                borderRadius: 8,
                paddingBlock: 16,
                marginTop: 8,
              }}
            >
              득점 추가
            </button>
          </form>
        </Form>

        <Toaster />
      </>
    );
  },
};
