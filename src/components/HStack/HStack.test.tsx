import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HStack } from "./HStack";

describe("렌더링", () => {
  test("자식 요소들이 올바르게 렌더링됨", () => {
    render(
      <HStack>
        <span>첫번째</span>
        <span>두번째</span>
      </HStack>,
    );

    expect(screen.getByText("첫번째")).toBeInTheDocument();
    expect(screen.getByText("두번째")).toBeInTheDocument();
  });

  test("direction이 row로 렌더링됨", () => {
    render(<HStack>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass("flex-d_row");
  });
});

describe("as 속성", () => {
  test("기본값으로 div 태그로 렌더링됨", () => {
    const { container } = render(<HStack>내용</HStack>);

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  test.each([
    { as: "section", tagName: "SECTION" },
    { as: "nav", tagName: "NAV" },
    { as: "article", tagName: "ARTICLE" },
    { as: "header", tagName: "HEADER" },
    { as: "footer", tagName: "FOOTER" },
    { as: "main", tagName: "MAIN" },
    { as: "aside", tagName: "ASIDE" },
    { as: "span", tagName: "SPAN" },
  ] as const)("as=$as일 때 $tagName 태그로 렌더링됨", ({ as, tagName }) => {
    const { container } = render(<HStack as={as}>내용</HStack>);

    expect(container.firstChild).toHaveProperty("tagName", tagName);
  });
});

describe("inline 속성", () => {
  test("inline={false}일 때 flex로 렌더링됨", () => {
    render(<HStack inline={false}>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass("d_flex");
  });

  test("inline={true}일 때 inline-flex로 렌더링됨", () => {
    render(<HStack inline>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass("d_inline-flex");
  });
});

describe("wrap 속성", () => {
  test.each([
    { wrap: "nowrap", className: "flex-wrap_nowrap" },
    { wrap: "wrap", className: "flex-wrap_wrap" },
    { wrap: "wrapReverse", className: "flex-wrap_wrap-reverse" },
  ] as const)("wrap=$wrap일 때 $className 클래스가 적용됨", ({
    wrap,
    className,
  }) => {
    render(<HStack wrap={wrap}>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass(className);
  });
});

describe("align 속성", () => {
  test.each([
    { align: "start", className: "ai_flex-start" },
    { align: "center", className: "ai_center" },
    { align: "end", className: "ai_flex-end" },
    { align: "stretch", className: "ai_stretch" },
    { align: "baseline", className: "ai_baseline" },
  ] as const)("align=$align일 때 $className 클래스가 적용됨", ({
    align,
    className,
  }) => {
    render(<HStack align={align}>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass(className);
  });
});

describe("justify 속성", () => {
  test.each([
    { justify: "start", className: "jc_flex-start" },
    { justify: "center", className: "jc_center" },
    { justify: "end", className: "jc_flex-end" },
    { justify: "between", className: "jc_space-between" },
    { justify: "around", className: "jc_space-around" },
    { justify: "evenly", className: "jc_space-evenly" },
  ] as const)("justify=$justify일 때 $className 클래스가 적용됨", ({
    justify,
    className,
  }) => {
    render(<HStack justify={justify}>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass(className);
  });
});

describe("gap 속성", () => {
  test("gap이 지정되면 gap 스타일이 적용됨", () => {
    render(<HStack gap={8}>내용</HStack>);

    expect(screen.getByText("내용")).toHaveClass("gap_8");
  });
});

describe("className 속성", () => {
  test("외부 className이 병합되어 적용됨", () => {
    render(<HStack className="custom-class">내용</HStack>);

    const element = screen.getByText("내용");
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("d_flex");
    expect(element).toHaveClass("flex-d_row");
  });
});
