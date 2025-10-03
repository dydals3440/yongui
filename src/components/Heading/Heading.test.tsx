import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import * as stories from "./Heading.stories";

const { Basic, Tones, Alignments, WordBreaks } = composeStories(stories);

describe("렌더링", () => {
  test("텍스트 내용이 올바르게 렌더링됨", () => {
    render(<Basic>Heading</Basic>);

    expect(screen.getByRole("heading")).toHaveTextContent("Heading");
  });
});

describe("level 속성", () => {
  test.each([
    { level: 1, description: "level 1일 때 h1 태그로 렌더링됨" },
    { level: 2, description: "level 2일 때 h2 태그로 렌더링됨" },
    { level: 3, description: "level 3일 때 h3 태그로 렌더링됨" },
    { level: 4, description: "level 4일 때 h4 태그로 렌더링됨" },
    { level: 5, description: "level 5일 때 h5 태그로 렌더링됨" },
    { level: 6, description: "level 6일 때 h6 태그로 렌더링됨" },
  ] as const)("$description", ({ level }) => {
    render(<Basic level={level} />);

    expect(screen.getByRole("heading", { level })).toBeInTheDocument();
  });
});

describe("size 속성", () => {
  test.each([
    { size: 1, description: "size 1일 때 가장 큰 글자 크기로 렌더링됨" },
    { size: 2, description: "size 2일 때 두번째 큰 글자 크기로 렌더링됨" },
    { size: 3, description: "size 3일 때 세번째 글자 크기로 렌더링됨" },
    { size: 4, description: "size 4일 때 네번째 글자 크기로 렌더링됨" },
    { size: 5, description: "size 5일 때 다섯번째 글자 크기로 렌더링됨" },
    { size: 6, description: "size 6일 때 가장 작은 글자 크기로 렌더링됨" },
  ] as const)("$description", ({ size }) => {
    render(<Basic size={size} />);

    expect(screen.getByRole("heading")).toHaveClass(
      `textStyle_heading.${size}`,
    );
  });
});

describe("tone 속성", () => {
  test.each([
    { tone: "neutral", text: "중립 색조", colorClass: "c_fg.neutral" },
    { tone: "brand", text: "브랜드 색조", colorClass: "c_fg.brand" },
    { tone: "danger", text: "위험 색조", colorClass: "c_fg.danger" },
    { tone: "warning", text: "경고 색조", colorClass: "c_fg.warning" },
    { tone: "success", text: "성공 색조", colorClass: "c_fg.success" },
    { tone: "info", text: "정보 색조", colorClass: "c_fg.info" },
  ] as const)("$tone tone이 올바르게 적용됨", ({ text, colorClass }) => {
    render(<Tones />);

    expect(screen.getByText(text)).toHaveClass(colorClass);
  });
});

describe("align 속성", () => {
  test.each([
    { align: "left", text: "텍스트를 왼쪽 정렬된 제목", alignClass: "ta_left" },
    {
      align: "center",
      text: "텍스트를 가운데 정렬된 제목",
      alignClass: "ta_center",
    },
    {
      align: "right",
      text: "텍스트를 오른쪽 정렬된 제목",
      alignClass: "ta_right",
    },
  ] as const)("$description", ({ text, alignClass }) => {
    render(<Alignments />);

    expect(screen.getByText(text)).toHaveClass(alignClass);
  });
});

describe("wordBreak 속성", () => {
  test.each([
    {
      wordBreak: "eng",
      text: "english line break",
      wordBreakClass: "wb_normal",
    },
    {
      wordBreak: "cjk",
      text: "한글은 단어 단위로 줄바꿈됩니다.",
      wordBreakClass: "wb_keep-all",
    },
  ] as const)("$description", ({ text, wordBreakClass }) => {
    render(<WordBreaks />);

    console.log(text);

    expect(screen.getByText(text)).toHaveClass(wordBreakClass);
  });
});
