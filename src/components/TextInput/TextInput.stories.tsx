import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { vstack } from '../../../styled-system/patterns';
import { TextInput } from './TextInput';

export default {
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    placeholder: '텍스트를 입력해주세요.',
    disabled: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '입력 필드의 크기',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    errorText: {
      control: 'text',
      description: '오류 메시지',
    },
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithIcons: Story = {
  render: (args) => (
    <div className={vstack({ gap: '16', w: '320px' })}>
      <TextInput
        {...args}
        leadingIcon='search'
        placeholder='검색어를 입력하세요...'
      />
      <TextInput
        {...args}
        trailingIcon='x'
        placeholder='아이디'
        defaultValue='storybook_user'
      />
      <TextInput
        {...args}
        disabled
        leadingIcon='star'
        placeholder='비활성화된 아이콘'
      />
    </div>
  ),
  argTypes: {
    leadingIcon: {
      control: false,
    },
    trailingIcon: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};

/**
 * `invalid` prop을 `true`로 설정하여 오류 상태를 시각적으로 표현할 수 있습니다.
 * 아이콘을 함께 사용하면, 아이콘의 색상도 오류 상태에 맞게 자동으로 변경됩니다.
 */
export const Invalid: Story = {
  render: (args) => (
    <div
      className={css({
        w: '320px',
      })}
    >
      <TextInput
        {...args}
        invalid
        trailingIcon='circleAlert'
        placeholder='이메일 형식이 올바르지 않습니다.'
      />
    </div>
  ),
  args: {
    invalid: true,
  },
  argTypes: {
    invalid: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};

/**
 * `disabled` prop을 true로 설정하면 입력이 비활성화됩니다.
 * 아이콘이 있을 경우, 아이콘도 비활성화 스타일이 적용됩니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '수정할 수 없습니다.',
    leadingIcon: 'star',
    'aria-label': '수정할 수 없는 입력 필드',
  },
  argTypes: {
    disabled: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};

const ControlledTextInput = () => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0 && newValue.length < 10) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className={css({ w: '320px' })}>
      <TextInput
        value={value}
        onChange={handleChange}
        placeholder='10자 이상 입력하세요...'
        invalid={hasError}
        trailingIcon={value.length > 0 ? 'x' : undefined}
      />
      <div className={css({ mt: '16', fontSize: 'sm' })}>
        <p>현재 값: {value}</p>
        <p>글자 수: {value.length}</p>
        {hasError && (
          <p className={css({ color: 'danger' })}>10자 이상 입력해야 합니다.</p>
        )}
      </div>
    </div>
  );
};

/**
 * `useState`와 함께 `value`, `onChange` prop을 사용하여 제어 컴포넌트로 만들 수 있습니다.
 */
export const Controlled: Story = {
  render: () => <ControlledTextInput />,
  argTypes: {
    invalid: { control: false },
    disabled: { control: false },
    placeholder: { control: false },
    value: { control: false },
  },
};

/**
 * `size` prop으로 입력 필드의 크기를 조절할 수 있습니다.
 * sm, md, lg 세 가지 크기를 제공합니다.
 */
export const Sizes: Story = {
  render: (args) => (
    <div className={vstack({ gap: '16', w: '320px' })}>
      <TextInput {...args} size='sm' placeholder='작은 크기 (sm)' />
      <TextInput {...args} size='md' placeholder='중간 크기 (md)' />
      <TextInput {...args} size='lg' placeholder='큰 크기 (lg)' />
    </div>
  ),
  argTypes: {
    size: { control: false },
    placeholder: { control: false },
  },
};

/**
 * `label` prop으로 입력 필드 위에 라벨을 표시할 수 있습니다.
 * `required` prop을 함께 사용하면 필수 입력 표시(*)가 추가됩니다.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className={vstack({ gap: '16', w: '320px' })}>
      <TextInput {...args} label='이름' placeholder='홍길동' />
      <TextInput
        {...args}
        label='이메일'
        required
        placeholder='example@email.com'
      />
      <TextInput
        {...args}
        label='검색'
        leadingIcon='search'
        placeholder='검색어를 입력하세요'
      />
    </div>
  ),
  argTypes: {
    label: { control: false },
    required: { control: false },
    placeholder: { control: false },
  },
};

/**
 * `helperText` prop으로 입력 필드 아래에 도움말을 표시할 수 있습니다.
 */
export const WithHelperText: Story = {
  render: (args) => (
    <div className={vstack({ gap: '16', w: '320px' })}>
      <TextInput
        {...args}
        label='비밀번호'
        type='password'
        helperText='8자 이상, 영문/숫자/특수문자 조합'
      />
      <TextInput
        {...args}
        label='전화번호'
        placeholder='010-0000-0000'
        helperText='하이픈(-)을 포함해서 입력해주세요'
      />
    </div>
  ),
  argTypes: {
    label: { control: false },
    helperText: { control: false },
    placeholder: { control: false },
  },
};

/**
 * `invalid`와 `errorText` prop을 함께 사용하여 오류 상태를 표시할 수 있습니다.
 * errorText는 invalid가 true일 때만 표시됩니다.
 */
export const WithError: Story = {
  render: (args) => (
    <div className={vstack({ gap: '16', w: '320px' })}>
      <TextInput
        {...args}
        label='이메일'
        invalid
        defaultValue='invalid-email'
        errorText='올바른 이메일 형식이 아닙니다'
        trailingIcon='circleAlert'
      />
      <TextInput
        {...args}
        label='사용자 이름'
        invalid
        defaultValue='ab'
        errorText='3자 이상 입력해주세요'
        helperText='3-20자의 영문/숫자 조합'
      />
    </div>
  ),
  argTypes: {
    label: { control: false },
    invalid: { control: false },
    errorText: { control: false },
    helperText: { control: false },
  },
};

/**
 * 모든 props를 함께 사용한 완전한 폼 필드 예시입니다.
 * label, required, helperText, errorText를 모두 활용할 수 있습니다.
 */
export const FormField: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value: string) => {
      if (!value) {
        setError('');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('올바른 이메일 형식이 아닙니다');
      } else {
        setError('');
      }
    };

    return (
      <div className={css({ w: '320px' })}>
        <TextInput
          label='이메일'
          required
          size='md'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          placeholder='example@email.com'
          helperText='회사 이메일을 입력해주세요'
          invalid={!!error}
          errorText={error}
          leadingIcon='mail'
        />
      </div>
    );
  },
  argTypes: {
    label: { control: false },
    required: { control: false },
    size: { control: false },
    helperText: { control: false },
    errorText: { control: false },
    invalid: { control: false },
  },
};
