import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { Button } from './Button';
import * as stories from './Button.stories';

const { Basic, Variants, Tones, Sizes, Disabled, Loading } =
  composeStories(stories);

test('버튼이 텍스트와 함께 정상적으로 렌더링된다', () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText('테스트')).toBeInTheDocument();
});

test('variant 속성에 따라 버튼 스타일이 올바르게 적용된다', () => {
  render(<Variants />);

  expect(screen.getByText('솔리드 버튼')).toHaveClass('bg_bgSolid.brand');
  expect(screen.getByText('아웃라인 버튼')).toHaveClass('bd_brand bd-w_lg');
});

test('tone 속성에 따라 각 색상 테마가 올바르게 적용된다', () => {
  render(<Tones />);

  expect(screen.getAllByText('브랜드 색조')[0]).toHaveClass('bg_bgSolid.brand');
  expect(screen.getAllByText('중립 색조')[0]).toHaveClass('bg_bgSolid.neutral');
  expect(screen.getAllByText('성공 색조')[0]).toHaveClass('bg_bgSolid.success');
  expect(screen.getAllByText('경고 색조')[0]).toHaveClass('bg_bgSolid.warning');
  expect(screen.getAllByText('위험 색조')[0]).toHaveClass('bg_bgSolid.danger');
  expect(screen.getAllByText('정보 색조')[0]).toHaveClass('bg_bgSolid.info');
});

test('size 속성에 따라 버튼의 폰트 크기가 올바르게 적용된다', () => {
  render(<Sizes />);

  expect(screen.getByText('작은 버튼')).toHaveClass('fs_sm');
  expect(screen.getByText('중간 버튼')).toHaveClass('fs_md');
  expect(screen.getByText('큰 버튼')).toHaveClass('fs_lg');
});

test('disabled 상태일 때 버튼이 비활성화되고 스타일이 올바르게 적용된다', () => {
  render(<Disabled />);

  expect(screen.getByText('비활성화 버튼')).toBeDisabled();
  expect(screen.getByText('활성화 버튼')).toBeEnabled();
  expect(screen.getByText('비활성화 버튼')).toHaveClass(
    'bg_bg.neutral.disabled!'
  );
});

test('type 속성을 명시하지 않으면 기본값으로 "button"이 설정된다', () => {
  render(<Basic>Default Button</Basic>);
  const button = screen.getByText('Default Button');
  expect(button).toHaveAttribute('type', 'button');
});

test('variant 속성만 지정하고 type을 생략해도 기본값으로 "button"이 설정된다', () => {
  render(<Basic variant='solid'>Default Button</Basic>);
  const button = screen.getByText('Default Button');
  expect(button).toHaveAttribute('type', 'button');
});

test('type="button"을 명시적으로 지정하면 해당 타입이 적용된다', () => {
  render(
    <Button type='button' variant='solid'>
      Button Type Button
    </Button>
  );
  const button = screen.getByText('Button Type Button');
  expect(button).toHaveAttribute('type', 'button');
});

test('type="submit"을 지정하면 제출 버튼으로 렌더링된다', () => {
  render(
    <form>
      <Button type='submit' variant='solid'>
        Submit Type Button
      </Button>
    </form>
  );
  const button = screen.getByText('Submit Type Button');
  expect(button).toHaveAttribute('type', 'submit');
});

test('type="submit" 버튼을 클릭하면 폼이 제출된다', async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <form onSubmit={handleSubmit}>
      <Button type='submit' variant='solid'>
        Submit Button
      </Button>
    </form>
  );

  const submitButton = screen.getByText('Submit Button');
  await user.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test('type="button" 버튼을 클릭해도 폼이 제출되지 않는다', async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();

  render(
    <form onSubmit={handleSubmit}>
      <Button type='button' variant='solid'>
        Button Type Button
      </Button>
    </form>
  );
  const buttonTypeButton = screen.getByText('Button Type Button');
  await user.click(buttonTypeButton);
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test('로딩 상태일 때 버튼이 비활성화되고 스피너가 표시된다', () => {
  render(<Loading />);

  const loadingButtons = screen.getAllByRole('button');
  const spinners = screen.getAllByLabelText('로딩 중');

  expect(spinners.length).toBeGreaterThan(0);
  loadingButtons.forEach((button) => {
    expect(button).toBeDisabled();
  });
  expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument();
});

test('로딩 상태일 때 원래 텍스트가 스피너로 교체된다', () => {
  render(
    <Button variant='solid' loading>
      저장
    </Button>
  );

  const spinner = screen.getByLabelText('로딩 중');
  expect(spinner).toBeInTheDocument();
  expect(screen.queryByText('저장')).not.toBeInTheDocument();
});

test('로딩 상태일 때 버튼 클릭이 동작하지 않는다', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Button variant='solid' loading onClick={handleClick}>
      클릭
    </Button>
  );

  const button = screen.getByRole('button');
  await user.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});

test('로딩 상태가 해제되면 버튼이 다시 활성화된다', async () => {
  const { rerender } = render(
    <Button variant='solid' loading>
      저장
    </Button>
  );

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByLabelText('로딩 중')).toBeInTheDocument();

  rerender(
    <Button variant='solid' loading={false}>
      저장
    </Button>
  );

  await waitFor(() => {
    expect(screen.getByRole('button')).toBeEnabled();
  });

  expect(screen.getByText('저장')).toBeInTheDocument();
  expect(screen.queryByLabelText('로딩 중')).not.toBeInTheDocument();
});

test('로딩과 disabled 속성이 동시에 적용된 경우 둘 다 비활성화 상태가 유지된다', () => {
  render(
    <Button variant='solid' loading disabled>
      버튼
    </Button>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(screen.getByLabelText('로딩 중')).toBeInTheDocument();
  expect(screen.queryByText('버튼')).not.toBeInTheDocument();
});

test('로딩 상태일 때 스피너에 애니메이션 클래스가 적용된다', () => {
  render(
    <Button variant='solid' loading>
      버튼
    </Button>
  );

  const spinner = screen.getByLabelText('로딩 중');
  expect(spinner).toHaveClass('animationStyle_spin');
});

test('outline 버튼의 로딩 상태일 때 스피너 색상이 올바르게 적용된다', () => {
  render(
    <Button variant='outline' loading>
      버튼
    </Button>
  );

  const spinner = screen.getByLabelText('로딩 중');
  expect(spinner).toHaveClass('c_fg.neutral.placeholder');
});

test('solid 버튼의 로딩 상태일 때 스피너 색상이 올바르게 적용된다', () => {
  render(
    <Button variant='solid' loading>
      버튼
    </Button>
  );

  const spinner = screen.getByLabelText('로딩 중');
  expect(spinner).toHaveClass('c_white');
});
