import { composeStories } from "@storybook/react-vite";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./Button";
import * as stories from "./Button.stories";

const { Basic, Variants, Tones, Sizes, Disabled, Loading } =
  composeStories(stories);

describe("렌더링", () => {
  test("버튼이 텍스트와 함께 올바르게 렌더링됨", () => {
    render(<Basic>테스트</Basic>);

    expect(screen.getByText("테스트")).toBeInTheDocument();
  });
});

describe("variant 속성", () => {
  test("solid variant가 올바른 배경 스타일로 렌더링됨", () => {
    render(<Variants />);

    expect(screen.getByText("솔리드 버튼")).toHaveClass("bg_bgSolid.brand");
  });

  test("outline variant가 올바른 테두리 스타일로 렌더링됨", () => {
    render(<Variants />);

    expect(screen.getByText("아웃라인 버튼")).toHaveClass("bd_brand bd-w_lg");
  });
});

describe("tone 속성", () => {
  test("brand tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("브랜드 색조")[0]).toHaveClass(
      "bg_bgSolid.brand",
    );
  });

  test("neutral tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("중립 색조")[0]).toHaveClass(
      "bg_bgSolid.neutral",
    );
  });

  test("success tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("성공 색조")[0]).toHaveClass(
      "bg_bgSolid.success",
    );
  });

  test("warning tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("경고 색조")[0]).toHaveClass(
      "bg_bgSolid.warning",
    );
  });

  test("danger tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("위험 색조")[0]).toHaveClass(
      "bg_bgSolid.danger",
    );
  });

  test("info tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getAllByText("정보 색조")[0]).toHaveClass("bg_bgSolid.info");
  });
});

describe("size 속성", () => {
  test("small 크기가 올바른 폰트 크기로 렌더링됨", () => {
    render(<Sizes />);

    expect(screen.getByText("작은 버튼")).toHaveClass("fs_sm");
  });

  test("medium 크기가 올바른 폰트 크기로 렌더링됨", () => {
    render(<Sizes />);

    expect(screen.getByText("중간 버튼")).toHaveClass("fs_md");
  });

  test("large 크기가 올바른 폰트 크기로 렌더링됨", () => {
    render(<Sizes />);

    expect(screen.getByText("큰 버튼")).toHaveClass("fs_lg");
  });
});

describe("disabled 속성", () => {
  test("disabled 상태일 때 버튼이 비활성화되고 올바른 스타일이 적용됨", () => {
    render(<Disabled />);

    expect(screen.getByText("비활성화 버튼")).toBeDisabled();
    expect(screen.getByText("활성화 버튼")).toBeEnabled();
    expect(screen.getByText("비활성화 버튼")).toHaveClass(
      "bg_bg.neutral.disabled!",
    );
  });
});

describe("type 속성", () => {
  test('type 미지정 시 기본값 "button"이 적용됨', () => {
    render(<Basic>Default Button</Basic>);

    const button = screen.getByText("Default Button");
    expect(button).toHaveAttribute("type", "button");
  });

  test('variant만 지정하고 type 미지정 시 기본값 "button"이 적용됨', () => {
    render(<Basic variant="solid">Default Button</Basic>);

    const button = screen.getByText("Default Button");
    expect(button).toHaveAttribute("type", "button");
  });

  test('type="button" 명시 시 해당 타입이 적용됨', () => {
    render(
      <Button type="button" variant="solid">
        Button Type Button
      </Button>,
    );

    const button = screen.getByText("Button Type Button");
    expect(button).toHaveAttribute("type", "button");
  });

  test('type="submit" 지정 시 제출 버튼으로 렌더링됨', () => {
    render(
      <form>
        <Button type="submit" variant="solid">
          Submit Type Button
        </Button>
      </form>,
    );

    const button = screen.getByText("Submit Type Button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test('type="submit" 버튼 클릭 시 폼이 제출됨', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit" variant="solid">
          Submit Button
        </Button>
      </form>,
    );

    const submitButton = screen.getByText("Submit Button");
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('type="button" 버튼 클릭 시 폼 제출이 방지됨', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <Button type="button" variant="solid">
          Button Type Button
        </Button>
      </form>,
    );

    const buttonTypeButton = screen.getByText("Button Type Button");
    await user.click(buttonTypeButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

describe("loading 속성", () => {
  test("loading 상태일 때 버튼이 비활성화되고 스피너가 표시됨", () => {
    render(<Loading />);

    const loadingButtons = screen.getAllByRole("button");
    const spinners = screen.getAllByLabelText("로딩 중");

    expect(spinners.length).toBeGreaterThan(0);
    loadingButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
    expect(screen.queryByText("로딩 중...")).not.toBeInTheDocument();
  });

  test("loading 상태일 때 원래 텍스트가 스피너로 교체됨", () => {
    render(
      <Button variant="solid" loading>
        저장
      </Button>,
    );

    const spinner = screen.getByLabelText("로딩 중");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("저장")).not.toBeInTheDocument();
  });

  test("loading 상태일 때 onClick 핸들러가 호출되지 않음", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button variant="solid" loading onClick={handleClick}>
        클릭
      </Button>,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("loading 상태 해제 시 버튼이 다시 활성화됨", async () => {
    const { rerender } = render(
      <Button variant="solid" loading>
        저장
      </Button>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByLabelText("로딩 중")).toBeInTheDocument();

    rerender(
      <Button variant="solid" loading={false}>
        저장
      </Button>,
    );

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeEnabled();
    });

    expect(screen.getByText("저장")).toBeInTheDocument();
    expect(screen.queryByLabelText("로딩 중")).not.toBeInTheDocument();
  });

  test("loading과 disabled 동시 적용 시 비활성화 상태가 유지됨", () => {
    render(
      <Button variant="solid" loading disabled>
        버튼
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByLabelText("로딩 중")).toBeInTheDocument();
    expect(screen.queryByText("버튼")).not.toBeInTheDocument();
  });

  test("loading 상태일 때 스피너에 회전 애니메이션이 적용됨", () => {
    render(
      <Button variant="solid" loading>
        버튼
      </Button>,
    );

    const spinner = screen.getByLabelText("로딩 중");
    expect(spinner).toHaveClass("animationStyle_spin");
  });

  test("outline variant loading 상태일 때 스피너 색상이 올바르게 적용됨", () => {
    render(
      <Button variant="outline" loading>
        버튼
      </Button>,
    );

    const spinner = screen.getByLabelText("로딩 중");
    expect(spinner).toHaveClass("c_fg.neutral.placeholder");
  });

  test("solid variant loading 상태일 때 스피너 색상이 올바르게 적용됨", () => {
    render(
      <Button variant="solid" loading>
        버튼
      </Button>,
    );

    const spinner = screen.getByLabelText("로딩 중");
    expect(spinner).toHaveClass("c_white");
  });
});
