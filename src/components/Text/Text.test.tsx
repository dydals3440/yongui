import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Text.stories";

const { Basic, Tones, Contrasts } = composeStories(stories);

describe("렌더링", () => {
  test("텍스트 내용이 올바르게 렌더링됨", () => {
    render(<Basic>텍스트</Basic>);

    expect(screen.getByText("텍스트")).toBeInTheDocument();
  });
});

describe("weight 속성", () => {
  test("weight prop에 해당하는 font-weight 클래스가 적용됨", () => {
    const weight = faker.helpers.arrayElement(
      Object.keys(fontWeights),
    ) as keyof typeof fontWeights;

    const { container } = render(<Basic weight={weight} />);
    console.log(container.innerHTML.trim());

    expect(screen.getByText("본문")).toHaveClass(`fw_${weight}`);
  });
});

describe("size 속성", () => {
  test("size prop에 해당하는 font-size 클래스가 적용됨", () => {
    const size = faker.helpers.arrayElement(
      Object.keys(fontSizes),
    ) as keyof typeof fontSizes;

    render(<Basic size={size} />);

    expect(screen.getByText("본문")).toHaveClass(`fs_${size}`);
  });
});

describe("tone 속성", () => {
  test.each([
    { tone: "neutral", text: "중립 색조", className: "c_fg.neutral" },
    { tone: "brand", text: "브랜드 색조", className: "c_fg.brand" },
    { tone: "danger", text: "위험 색조", className: "c_fg.danger" },
    { tone: "warning", text: "경고 색조", className: "c_fg.warning" },
    { tone: "success", text: "성공 색조", className: "c_fg.success" },
    { tone: "info", text: "정보 색조", className: "c_fg.info" },
  ])("$tone tone이 올바르게 적용됨", ({ text, className }) => {
    render(<Tones />);

    expect(screen.getByText(text)).toHaveClass(className);
  });
});

describe("contrast 속성", () => {
  test.each([
    {
      contrast: "low",
      text: "낮은 명암비",
      className: "c_fg.neutral.placeholder",
    },
    { contrast: "high", text: "높은 명암비", className: "c_fg.neutral" },
  ] as const)("$contrast contrast가 올바르게 적용됨", ({ text, className }) => {
    render(<Contrasts />);

    expect(screen.getByText(text)).toHaveClass(className);
  });
});
