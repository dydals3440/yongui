import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { vstack } from "../../../styled-system/patterns";
import { Button } from "../Button/Button";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    id: "checkbox",
    label: "기본 체크박스",
  },
  argTypes: {
    label: {
      control: "text",
      description: "체크박스 라벨",
    },
    tone: {
      control: "select",
      description: "체크박스의 색조",
    },
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {};

export const Tones: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} tone="brand" id="brand" label="브랜드 색조" />
        <Checkbox {...args} tone="neutral" id="neutral" label="중립 색조" />
        <Checkbox {...args} tone="danger" id="danger" label="위험 색조" />
        <Checkbox {...args} tone="success" id="success" label="성공 색조" />
        <Checkbox {...args} tone="warning" id="warning" label="경고 색조" />
        <Checkbox {...args} tone="info" id="info" label="정보 색조" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
};

export const States: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} id="checked" label="체크된 상태" checked={true} />
        <Checkbox
          {...args}
          id="unchecked"
          label="체크되지 않은 상태"
          checked={false}
        />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          id="disabled-checked"
          label="비활성화 & 체크된 상태"
          disabled
          checked
        />
        <Checkbox
          {...args}
          id="disabled-unchecked"
          label="비활성화 & 체크되지 않은 상태"
          disabled
        />
        <Checkbox {...args} id="enabled" label="활성화 상태" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
};

export const Required: StoryObj<typeof Checkbox> = {
  render: (args) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("submit");
    };

    return (
      <form
        className={vstack({
          gap: "16",
        })}
        onSubmit={handleSubmit}
      >
        <Checkbox
          {...args}
          id="required"
          label="필수 입력 체크 박스"
          required
        />
        <Checkbox
          {...args}
          id="optional"
          label="선택 사항 체크 박스"
          // default is false
          required={false}
        />

        <Button type="submit" variant="outline">
          제출
        </Button>
      </form>
    );
  },
};

export const WithValue: StoryObj<typeof Checkbox> = {
  render: (args) => {
    const [checkedValue, setCheckedValue] = useState<string | null>(null);

    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          id="with-value"
          label="값이 있는 체크박스"
          value="checkbox-value"
          onChange={(checked) => {
            setCheckedValue(checked === true ? "checkbox-value" : null);
          }}
        />
        <span id="checkbox-value">
          체크박스 값: {checkedValue ?? "선택 안됨"}
        </span>
      </div>
    );
  },
};
