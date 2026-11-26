import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { type IconName, icons } from "../../tokens/iconography";
import * as stories from "./Icon.stories";

const { Basic } = composeStories(stories);

test.each(Object.keys(icons) as IconName[])(
  '아이콘 "%s"가 기본 설정으로 정상 표시된다',
  (name) => {
    render(<Basic name={name} aria-label={name} />);

    expect(screen.getByLabelText(name)).toBeInTheDocument();
    expect(screen.getByLabelText(name)).toHaveClass("c_currentcolor");
    expect(screen.getByLabelText(name)).toHaveClass("w_1.25rem h_1.25rem");
    expect(screen.getByLabelText(name)).toHaveAttribute("aria-label", name);
    expect(screen.getByLabelText(name)).toHaveAttribute("role", "img");
  },
);

test.each([
  ["neutral", "c_fg.neutral"],
  ["brand", "c_fg.brand"],
  ["danger", "c_fg.danger"],
  ["warning", "c_fg.warning"],
  ["success", "c_fg.success"],
  ["info", "c_fg.info"],
] as const)('tone="%s"일 때 해당 색상(%s)이 적용된다', (tone, className) => {
  render(<Basic tone={tone} aria-label={tone} />);

  expect(screen.getByLabelText(tone)).toHaveClass(className);
});

test.each([
  ["xs", "w_0.75rem h_0.75rem"],
  ["sm", "w_1rem h_1rem"],
  ["md", "w_1.25rem h_1.25rem"],
  ["lg", "w_1.5rem h_1.5rem"],
] as const)('size="%s"일 때 해당 크기(%s)로 렌더링된다', (size, className) => {
  render(<Basic size={size} aria-label={size} />);

  expect(screen.getByLabelText(size)).toHaveClass(className);
});

test("등록되지 않은 아이콘 이름을 전달하면 물음표 아이콘으로 대체된다", () => {
  render(<Basic name={"nonExistent" as IconName} aria-label="fallback" />);

  const icon = screen.getByLabelText("fallback");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute("role", "img");
});
