import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Text.stories";

const { Basic, Tones, Contrasts } = composeStories(stories);

test("Text 컴포넌트가 children으로 전달받은 텍스트를 정상적으로 렌더링한다", () => {
  render(<Basic>텍스트</Basic>);

  expect(screen.getByText("텍스트")).toBeInTheDocument();
});

test("weight prop을 전달하면 해당하는 font-weight 스타일 클래스가 적용된다", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights),
  ) as keyof typeof fontWeights;

  const { container } = render(<Basic weight={weight} />);
  console.log(container.innerHTML.trim());

  expect(screen.getByText("본문")).toHaveClass(`fw_${weight}`);
});

test("size prop을 전달하면 해당하는 font-size 스타일 클래스가 적용된다", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes),
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByText("본문")).toHaveClass(`fs_${size}`);
});

test.each([
  ["중립 색조", "c_fg.neutral"],
  ["브랜드 색조", "c_fg.brand"],
  ["위험 색조", "c_fg.danger"],
  ["경고 색조", "c_fg.warning"],
  ["성공 색조", "c_fg.success"],
  ["정보 색조", "c_fg.info"],
])("tone prop이 %s일 때 %s 클래스가 적용되어야 한다", (textName, className) => {
  render(<Tones />);

  expect(screen.getByText(textName)).toHaveClass(className);
});

test.each([
  ["낮은 명암비", "c_fg.neutral.placeholder"],
  ["높은 명암비", "c_fg.neutral"],
] as const)(
  "contrast prop이 %s 설정일 때 %s 클래스가 적용되어야 한다",
  (textName, className) => {
    render(<Contrasts />);

    expect(screen.getByText(textName)).toHaveClass(className);
  },
);
