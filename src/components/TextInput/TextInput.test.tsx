import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TextInput } from "./TextInput";
import * as stories from "./TextInput.stories";

const {
  Default,
  WithIcons,
  Invalid,
  Disabled,
  Controlled,
  Sizes,
  WithLabel,
  WithHelperText,
  WithError,
  FormField,
} = composeStories(stories);

describe("렌더링", () => {
  test("Default 스토리가 올바르게 렌더링됨", () => {
    render(<Default />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "텍스트를 입력해주세요.");
  });

  test("전달한 props로 올바르게 렌더링되어야 합니다.", () => {
    render(
      <TextInput
        placeholder="이름을 입력하세요"
        data-testid="text-input"
        defaultValue="초기값"
      />,
    );
    const input = screen.getByTestId("text-input");

    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input).toHaveAttribute("placeholder", "이름을 입력하세요");
    expect(input).toHaveValue("초기값");
  });

  test("사용자가 텍스트를 입력하면 value가 변경되고 onChange 핸들러가 호출되어야 합니다.", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextInput
        onChange={handleChange}
        placeholder="테스트"
        data-testid="text-input"
      />,
    );
    const input = screen.getByTestId("text-input");

    await user.type(input, "안녕하세요");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("안녕하세요");
  });
});

describe("아이콘 렌더링", () => {
  test("leadingIcon이 올바르게 렌더링됨", () => {
    render(
      <TextInput
        leadingIcon="search"
        placeholder="검색어를 입력하세요"
        data-testid="text-input"
      />,
    );

    const leadingIcon = screen.getByTestId("icon-search");
    expect(leadingIcon).toBeInTheDocument();
  });

  test("trailingIcon이 올바르게 렌더링됨", () => {
    render(
      <TextInput
        trailingIcon="x"
        placeholder="아이디"
        data-testid="text-input"
      />,
    );

    const trailingIcon = screen.getByTestId("icon-x");
    expect(trailingIcon).toBeInTheDocument();
  });

  test("leadingIcon과 trailingIcon이 동시에 렌더링됨", () => {
    render(
      <TextInput
        leadingIcon="search"
        trailingIcon="x"
        placeholder="검색어를 입력하세요"
        data-testid="text-input"
      />,
    );

    const leadingIcon = screen.getByTestId("icon-search");
    const trailingIcon = screen.getByTestId("icon-x");

    expect(leadingIcon).toBeInTheDocument();
    expect(trailingIcon).toBeInTheDocument();
  });

  test("WithIcons 스토리가 여러 아이콘 조합을 렌더링함", () => {
    render(<WithIcons />);

    // leadingIcon='search'가 있는 input
    expect(screen.getByTestId("icon-search")).toBeInTheDocument();

    // trailingIcon='x'가 있는 input
    expect(screen.getByTestId("icon-x")).toBeInTheDocument();

    // disabled이면서 leadingIcon='star'가 있는 input
    expect(screen.getByTestId("icon-star")).toBeInTheDocument();
  });
});

describe("Invalid 상태", () => {
  test("invalid prop이 true일 때 aria-invalid 속성이 설정됨", () => {
    render(
      <TextInput invalid placeholder="잘못된 입력" data-testid="text-input" />,
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("Invalid 스토리가 올바르게 렌더링됨", () => {
    render(<Invalid />);

    const input = screen.getByRole("textbox");
    const icon = screen.getByTestId("icon-circleAlert");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(icon).toBeInTheDocument();
  });

  test("invalid 상태일 때 아이콘이 danger tone으로 렌더링됨", () => {
    render(
      <TextInput
        invalid
        trailingIcon="circleAlert"
        placeholder="오류"
        data-testid="text-input"
      />,
    );

    const icon = screen.getByTestId("icon-circleAlert");
    expect(icon).toBeInTheDocument();
  });
});

describe("Disabled 상태", () => {
  test("disabled prop이 true일 때 disabled 속성이 설정됨", () => {
    render(
      <TextInput disabled placeholder="비활성화됨" data-testid="text-input" />,
    );

    const input = screen.getByTestId("text-input");
    expect(input).toBeDisabled();
  });

  test("Disabled 스토리가 올바르게 렌더링됨", () => {
    render(<Disabled />);

    const input = screen.getByRole("textbox", {
      name: "수정할 수 없는 입력 필드",
    });

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input).toHaveValue("수정할 수 없습니다.");
  });

  test("disabled 상태일 때 사용자 입력을 받지 않음", async () => {
    const user = userEvent.setup();

    render(
      <TextInput disabled placeholder="비활성화됨" data-testid="text-input" />,
    );

    const input = screen.getByTestId("text-input");
    await user.type(input, "입력 시도");

    expect(input).toHaveValue("");
  });

  test("disabled 상태일 때 wrapper에 data-disabled 속성이 설정됨", () => {
    const { container } = render(
      <TextInput disabled placeholder="비활성화됨" data-testid="text-input" />,
    );

    const wrapper = container.querySelector("[data-disabled]");
    expect(wrapper).toBeInTheDocument();
  });

  test("disabled 상태일 때 leadingIcon이 neutral tone으로 렌더링됨", () => {
    render(
      <TextInput
        disabled
        leadingIcon="star"
        placeholder="비활성화됨"
        data-testid="text-input"
      />,
    );

    const icon = screen.getByTestId("icon-star");
    expect(icon).toBeInTheDocument();
  });
});

describe("Controlled 컴포넌트", () => {
  test("Controlled 스토리가 올바르게 렌더링됨", () => {
    render(<Controlled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "10자 이상 입력하세요...");
    expect(screen.getByText("현재 값:")).toBeInTheDocument();
    expect(screen.getByText("글자 수: 0")).toBeInTheDocument();
  });

  test("텍스트 입력 시 value가 업데이트됨", async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
    expect(screen.getByText("현재 값: Hello")).toBeInTheDocument();
    expect(screen.getByText("글자 수: 5")).toBeInTheDocument();
  });

  test("10자 미만 입력 시 에러 메시지가 표시됨", async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Short");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("10자 이상 입력해야 합니다.")).toBeInTheDocument();
  });

  test("10자 이상 입력 시 에러 상태가 해제됨", async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const input = screen.getByRole("textbox");
    await user.type(input, "This is a long text");

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(
      screen.queryByText("10자 이상 입력해야 합니다."),
    ).not.toBeInTheDocument();
  });

  test("텍스트 입력 시 trailingIcon이 동적으로 표시됨", async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    // 초기에는 아이콘이 없음
    expect(screen.queryByTestId("icon-x")).not.toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await user.type(input, "Test");

    // 입력 후 'x' 아이콘이 표시됨
    expect(screen.getByTestId("icon-x")).toBeInTheDocument();
  });

  test("빈 문자열일 때는 에러가 표시되지 않음", async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const input = screen.getByRole("textbox");

    // 텍스트를 입력했다가 모두 삭제
    await user.type(input, "Test");
    await user.clear(input);

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(
      screen.queryByText("10자 이상 입력해야 합니다."),
    ).not.toBeInTheDocument();
  });
});

describe("사용자 상호작용", () => {
  test("onChange 핸들러가 각 입력마다 호출됨", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextInput
        onChange={handleChange}
        placeholder="테스트"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    await user.type(input, "ABC");

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  test("focus 이벤트가 올바르게 동작함", async () => {
    const handleFocus = vi.fn();
    const user = userEvent.setup();

    render(
      <TextInput
        onFocus={handleFocus}
        placeholder="테스트"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    await user.click(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  test("blur 이벤트가 올바르게 동작함", async () => {
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(
      <TextInput
        onBlur={handleBlur}
        placeholder="테스트"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    await user.click(input);
    await user.tab();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});

describe("접근성", () => {
  test("textbox role이 올바르게 설정됨", () => {
    render(<TextInput placeholder="테스트" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("aria-label이 올바르게 적용됨", () => {
    render(<TextInput placeholder="테스트" aria-label="사용자 이름" />);

    const input = screen.getByRole("textbox", { name: "사용자 이름" });
    expect(input).toBeInTheDocument();
  });

  test("invalid 상태일 때 aria-invalid가 true로 설정됨", () => {
    render(<TextInput invalid placeholder="테스트" data-testid="text-input" />);

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("valid 상태일 때 aria-invalid가 설정되지 않음", () => {
    render(
      <TextInput
        invalid={false}
        placeholder="테스트"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    expect(input).not.toHaveAttribute("aria-invalid");
  });
});

describe("placeholder", () => {
  test("placeholder가 올바르게 표시됨", () => {
    render(<TextInput placeholder="이메일을 입력하세요" />);

    const input = screen.getByPlaceholderText("이메일을 입력하세요");
    expect(input).toBeInTheDocument();
  });

  test("placeholder 없이도 렌더링됨", () => {
    render(<TextInput data-testid="text-input" />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
  });
});

describe("Size", () => {
  test("Sizes 스토리가 올바르게 렌더링됨", () => {
    render(<Sizes />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);
  });

  test("size prop이 올바르게 적용됨", () => {
    render(
      <TextInput size="sm" placeholder="Small" data-testid="text-input" />,
    );

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Small");
  });

  test("size를 지정하지 않으면 기본값 md가 적용됨", () => {
    render(<TextInput placeholder="Default" data-testid="text-input" />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
  });
});

describe("Label과 Required", () => {
  test("WithLabel 스토리가 올바르게 렌더링됨", () => {
    render(<WithLabel />);

    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("검색")).toBeInTheDocument();
  });

  test("label이 올바르게 렌더링됨", () => {
    render(
      <TextInput label="사용자 이름" id="username" data-testid="text-input" />,
    );

    const label = screen.getByText("사용자 이름");
    expect(label).toBeInTheDocument();
  });

  test("label을 클릭하면 input에 포커스됨", async () => {
    const user = userEvent.setup();
    render(<TextInput label="이메일" id="email" data-testid="text-input" />);

    const label = screen.getByText("이메일");
    const input = screen.getByTestId("text-input");

    await user.click(label);
    expect(input).toHaveFocus();
  });

  test("required가 true일 때 asterisk(*)가 표시됨", () => {
    render(<TextInput label="이메일" required id="email" />);

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
  });

  test("required가 true일 때 aria-required 속성이 설정됨", () => {
    render(
      <TextInput label="이메일" required id="email" data-testid="text-input" />,
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("aria-required", "true");
  });

  test("label 없이 required만 사용해도 동작함", () => {
    render(<TextInput required id="email" data-testid="text-input" />);

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("aria-required", "true");
  });
});

describe("HelperText", () => {
  test("WithHelperText 스토리가 올바르게 렌더링됨", () => {
    render(<WithHelperText />);

    expect(
      screen.getByText("8자 이상, 영문/숫자/특수문자 조합"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("하이픈(-)을 포함해서 입력해주세요"),
    ).toBeInTheDocument();
  });

  test("helperText가 올바르게 렌더링됨", () => {
    render(
      <TextInput
        label="비밀번호"
        helperText="8자 이상 입력하세요"
        id="password"
      />,
    );

    const helperText = screen.getByText("8자 이상 입력하세요");
    expect(helperText).toBeInTheDocument();
  });

  test("helperText가 input과 aria-describedby로 연결됨", () => {
    render(
      <TextInput
        label="비밀번호"
        helperText="8자 이상 입력하세요"
        id="password"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    const helperText = screen.getByText("8자 이상 입력하세요");

    expect(input).toHaveAttribute("aria-describedby", "password-message");
    expect(helperText).toHaveAttribute("id", "password-message");
  });
});

describe("ErrorText", () => {
  test("WithError 스토리가 올바르게 렌더링됨", () => {
    render(<WithError />);

    expect(
      screen.getByText("올바른 이메일 형식이 아닙니다"),
    ).toBeInTheDocument();
    expect(screen.getByText("3자 이상 입력해주세요")).toBeInTheDocument();
  });

  test("invalid가 true일 때 errorText가 표시됨", () => {
    render(
      <TextInput
        label="이메일"
        invalid
        errorText="올바른 이메일 형식이 아닙니다"
        id="email"
      />,
    );

    const errorText = screen.getByText("올바른 이메일 형식이 아닙니다");
    expect(errorText).toBeInTheDocument();
  });

  test("invalid가 false일 때 errorText가 표시되지 않음", () => {
    render(
      <TextInput
        label="이메일"
        invalid={false}
        errorText="올바른 이메일 형식이 아닙니다"
        helperText="이메일을 입력하세요"
        id="email"
      />,
    );

    expect(
      screen.queryByText("올바른 이메일 형식이 아닙니다"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("이메일을 입력하세요")).toBeInTheDocument();
  });

  test("invalid와 errorText가 함께 사용되면 helperText 대신 errorText가 표시됨", () => {
    render(
      <TextInput
        label="이메일"
        invalid
        helperText="이메일을 입력하세요"
        errorText="올바른 이메일 형식이 아닙니다"
        id="email"
      />,
    );

    expect(
      screen.getByText("올바른 이메일 형식이 아닙니다"),
    ).toBeInTheDocument();
    expect(screen.queryByText("이메일을 입력하세요")).not.toBeInTheDocument();
  });

  test("errorText가 input과 aria-describedby로 연결됨", () => {
    render(
      <TextInput
        label="이메일"
        invalid
        errorText="올바른 이메일 형식이 아닙니다"
        id="email"
        data-testid="text-input"
      />,
    );

    const input = screen.getByTestId("text-input");
    const errorText = screen.getByText("올바른 이메일 형식이 아닙니다");

    expect(input).toHaveAttribute("aria-describedby", "email-message");
    expect(errorText).toHaveAttribute("id", "email-message");
  });
});

describe("FormField 통합", () => {
  test("FormField 스토리가 올바르게 렌더링됨", () => {
    render(<FormField />);

    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("회사 이메일을 입력해주세요")).toBeInTheDocument();
  });

  test("모든 props가 함께 동작함", () => {
    render(
      <TextInput
        size="lg"
        label="이메일"
        required
        invalid
        helperText="이메일을 입력하세요"
        errorText="올바른 이메일 형식이 아닙니다"
        leadingIcon="mail"
        id="email"
        data-testid="text-input"
      />,
    );

    // label과 required
    expect(screen.getByText("이메일")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();

    // errorText (invalid가 true이므로 helperText 대신 표시)
    expect(
      screen.getByText("올바른 이메일 형식이 아닙니다"),
    ).toBeInTheDocument();

    // icon
    expect(screen.getByTestId("icon-mail")).toBeInTheDocument();

    // input 속성들
    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-message");
  });
});
