import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { css } from "../../../styled-system/css";
import { Box } from "./Box";

describe("렌더링", () => {
  test("자식 요소들이 올바르게 렌더링됨", () => {
    render(
      <Box>
        <span>첫번째</span>
        <span>두번째</span>
      </Box>,
    );

    expect(screen.getByText("첫번째")).toBeInTheDocument();
    expect(screen.getByText("두번째")).toBeInTheDocument();
  });
});

describe("as 속성", () => {
  test("기본값으로 div 태그로 렌더링됨", () => {
    const { container } = render(<Box>내용</Box>);

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
    const { container } = render(<Box as={as}>내용</Box>);

    expect(container.firstChild).toHaveProperty("tagName", tagName);
  });
});

describe("padding 속성", () => {
  test("padding이 지정되면 padding 클래스가 적용됨", () => {
    render(<Box padding={16}>내용</Box>);

    expect(screen.getByText("내용")).toHaveClass("p_16");
  });
});

describe("margin 속성", () => {
  test("margin이 지정되면 margin 클래스가 적용됨", () => {
    render(<Box margin={24}>내용</Box>);

    expect(screen.getByText("내용")).toHaveClass("m_24");
  });
});

describe("size 속성", () => {
  test("width와 height가 스타일로 적용됨", () => {
    render(
      <Box width="200px" height="120px">
        내용
      </Box>,
    );

    const element = screen.getByText("내용");
    expect(element).toHaveStyle({ width: "200px", height: "120px" });
  });
});

describe("className과 inline style 병합", () => {
  test("className과 width/height가 함께 적용됨", () => {
    render(
      <Box
        width="240px"
        height="140px"
        className={css({ backgroundColor: "red" })}
      >
        내용
      </Box>,
    );

    const element = screen.getByText("내용");
    // width, height는 inline style로 적용
    expect(element).toHaveStyle({
      width: "240px",
      height: "140px",
    });
    // backgroundColor는 PandaCSS 클래스로 적용
    expect(element).toHaveClass("bg-c_red");
  });
});

describe("className 속성", () => {
  test("외부 className이 병합되어 적용됨", () => {
    render(
      <Box padding={8} className="custom-class">
        내용
      </Box>,
    );

    const element = screen.getByText("내용");
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("p_8");
  });
});
