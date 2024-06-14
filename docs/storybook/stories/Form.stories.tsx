import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
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
