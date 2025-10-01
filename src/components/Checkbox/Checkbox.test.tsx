import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import * as stories from "./Checkbox.stories";

const { Basic, Tones, States, Disabled, Required } = composeStories(stories);

describe("렌더링", () => {
  test("체크박스와 라벨이 올바르게 렌더링됨", async () => {
    const user = userEvent.setup();
    render(<Basic />);

    const checkbox = screen.getByLabelText("기본 체크박스");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-state", "unchecked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  test("checked/unchecked 상태가 올바르게 렌더링됨", () => {
    render(<States />);

    const checkedCheckbox = screen.getByLabelText("체크된 상태");
    const uncheckedCheckbox = screen.getByLabelText("체크되지 않은 상태");

    expect(checkedCheckbox).toHaveAttribute("data-state", "checked");
    expect(uncheckedCheckbox).toHaveAttribute("data-state", "unchecked");
  });
});

describe("Tone 속성", () => {
  test("brand tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const brandCheckbox = screen.getByRole("checkbox", { name: "브랜드 색조" });
    await user.click(brandCheckbox);

    expect(brandCheckbox).toHaveAttribute("data-state", "checked");
    expect(brandCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.brand",
    );
  });

  test("neutral tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const neutralCheckbox = screen.getByRole("checkbox", { name: "중립 색조" });
    await user.click(neutralCheckbox);

    expect(neutralCheckbox).toHaveAttribute("data-state", "checked");
    expect(neutralCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.neutral",
    );
  });

  test("success tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const successCheckbox = screen.getByRole("checkbox", { name: "성공 색조" });
    await user.click(successCheckbox);

    expect(successCheckbox).toHaveAttribute("data-state", "checked");
    expect(successCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.success",
    );
  });

  test("warning tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const warningCheckbox = screen.getByRole("checkbox", { name: "경고 색조" });
    await user.click(warningCheckbox);

    expect(warningCheckbox).toHaveAttribute("data-state", "checked");
    expect(warningCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.warning",
    );
  });

  test("danger tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const dangerCheckbox = screen.getByRole("checkbox", { name: "위험 색조" });
    await user.click(dangerCheckbox);

    expect(dangerCheckbox).toHaveAttribute("data-state", "checked");
    expect(dangerCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.danger",
    );
  });

  test("info tone이 올바르게 적용됨", async () => {
    const user = userEvent.setup();
    render(<Tones />);

    const infoCheckbox = screen.getByRole("checkbox", { name: "정보 색조" });
    await user.click(infoCheckbox);

    expect(infoCheckbox).toHaveAttribute("data-state", "checked");
    expect(infoCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bgSolid.info",
    );
  });
});

describe("disabled 속성", () => {
  test("disabled 상태일 때 올바른 스타일이 적용됨", () => {
    render(<Disabled />);

    const disabledCheckedCheckbox = screen.getByLabelText(
      "비활성화 & 체크된 상태",
    );
    const disabledUncheckedCheckbox = screen.getByLabelText(
      "비활성화 & 체크되지 않은 상태",
    );

    expect(disabledCheckedCheckbox).toHaveAttribute("data-state", "checked");
    expect(disabledUncheckedCheckbox).toHaveAttribute(
      "data-state",
      "unchecked",
    );

    expect(disabledCheckedCheckbox).toHaveClass(
      "[&[data-state='checked']]:bg_bg.neutral.disabled!",
    );
    expect(disabledCheckedCheckbox).toHaveClass(
      "[&[data-state='checked']]:bd-c_bg.neutral.disabled!",
    );
    expect(disabledUncheckedCheckbox).toHaveClass(
      "[&:disabled]:bd-c_border.neutral.disabled",
    );
  });
});

describe("required 속성", () => {
  test("required일 때 aria-required와 별표가 표시됨", () => {
    render(
      <Checkbox id="required-checkbox" label="필수 체크박스" required={true} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: /필수 체크박스/ });
    const requiredIndicator = screen.getByText("*");

    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass("c_fg.danger");
  });

  test("required와 optional 체크박스가 모두 표시됨", () => {
    render(<Required />);

    expect(
      screen.getByRole("checkbox", {
        name: "필수 입력 체크 박스 *",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: "선택 사항 체크 박스",
      }),
    ).toBeInTheDocument();
  });
});

describe("onChange 핸들러", () => {
  test("클릭 시 onChange가 호출됨", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox
        id="test-checkbox"
        label="테스트 체크박스"
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByLabelText("테스트 체크박스");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, undefined);

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(false, undefined);
  });

  test("value가 있을 때 onChange에 value가 전달됨", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox
        id="value-checkbox"
        label="값이 있는 체크박스"
        value="test-value"
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByLabelText("값이 있는 체크박스");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true, "test-value");
  });
});
