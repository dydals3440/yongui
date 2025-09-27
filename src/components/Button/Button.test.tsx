import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react-vite';
import * as stories from './Button.stories';

const { Basic } = composeStories(stories);

test('텍스트와 함께 버튼이 올바르게 렌더링됨', () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText('테스트')).toBeInTheDocument();
});
