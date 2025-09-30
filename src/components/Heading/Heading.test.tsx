import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Heading.stories";

const { Basic, Tones } = composeStories(stories);

test("텍스트 내용이 화면에 표시되어야 한다", () => {
  render(<Basic>Heading</Basic>);

  expect(screen.getByRole("heading")).toHaveTextContent("Heading");
});

test.each([
  { level: 1, description: "level이 1이면 h1 태그로 표시되어야 한다" },
  { level: 2, description: "level이 2이면 h2 태그로 표시되어야 한다" },
  { level: 3, description: "level이 3이면 h3 태그로 표시되어야 한다" },
  { level: 4, description: "level이 4이면 h4 태그로 표시되어야 한다" },
  { level: 5, description: "level이 5이면 h5 태그로 표시되어야 한다" },
  { level: 6, description: "level이 6이면 h6 태그로 표시되어야 한다" },
] as const)("$description", ({ level }) => {
  render(<Basic level={level} />);

  expect(screen.getByRole("heading", { level })).toBeInTheDocument();
});

test.each([
  { size: 1, description: "size가 1이면 가장 큰 글자 크기로 표시되어야 한다" },
  {
    size: 2,
    description: "size가 2이면 두번째로 큰 글자 크기로 표시되어야 한다",
  },
  { size: 3, description: "size가 3이면 세번째 글자 크기로 표시되어야 한다" },
  { size: 4, description: "size가 4이면 네번째 글자 크기로 표시되어야 한다" },
  { size: 5, description: "size가 5이면 다섯번째 글자 크기로 표시되어야 한다" },
  {
    size: 6,
    description: "size가 6이면 가장 작은 글자 크기로 표시되어야 한다",
  },
] as const)("$description", ({ size }) => {
  render(<Basic size={size} />);

  expect(screen.getByRole("heading")).toHaveClass(`textStyle_heading.${size}`);
});

test.each([
  { tone: "중립", text: "중립 색조", colorClass: "c_fg.neutral" },
  { tone: "브랜드", text: "브랜드 색조", colorClass: "c_fg.brand" },
  { tone: "위험", text: "위험 색조", colorClass: "c_fg.danger" },
  { tone: "경고", text: "경고 색조", colorClass: "c_fg.warning" },
  { tone: "성공", text: "성공 색조", colorClass: "c_fg.success" },
  { tone: "정보", text: "정보 색조", colorClass: "c_fg.info" },
] as const)(
  "$tone 톤을 선택하면 해당 색상으로 표시되어야 한다",
  ({ text, colorClass }) => {
    render(<Tones />);

    expect(screen.getByText(text)).toHaveClass(colorClass);
  },
);
