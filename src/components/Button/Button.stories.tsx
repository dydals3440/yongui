import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Button } from "./Button";

export default {
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=0-1",
    },
  },
  args: {
    children: "시작하기",
    variant: "solid",
    size: "md",
    disabled: false,
    loading: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "버튼의 텍스트",
    },
    variant: {
      control: "select",
      description: "버튼의 스타일 종류",
    },
    size: {
      control: "select",
      description: "버튼의 크기",
    },
    tone: {
      control: "select",
      description: "버튼의 색상 강조",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태 여부",
    },
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} variant="solid">
          솔리드 버튼
        </Button>
        <Button {...args} variant="outline">
          아웃라인 버튼
        </Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
};

export const Tones: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} variant="solid" tone="brand">
          브랜드 색조
        </Button>
        <Button {...args} variant="solid" tone="neutral">
          중립 색조
        </Button>
        <Button {...args} variant="solid" tone="danger">
          위험 색조
        </Button>
        <Button {...args} variant="solid" tone="success">
          성공 색조
        </Button>
        <Button {...args} variant="solid" tone="warning">
          경고 색조
        </Button>
        <Button {...args} variant="solid" tone="info">
          정보 색조
        </Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} size="sm">
          작은 버튼
        </Button>
        <Button {...args} size="md">
          중간 버튼
        </Button>
        <Button {...args} size="lg">
          큰 버튼
        </Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} disabled>
          비활성화 버튼
        </Button>
        <Button {...args}>활성화 버튼</Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
};

export const Loading: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={vstack({ gap: "8", alignItems: "center" })}>
          <p style={{ fontSize: "14px", color: "#666" }}>솔리드 버튼</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button {...args} variant="solid" size="sm" loading>
              작은 버튼
            </Button>
            <Button {...args} variant="solid" size="md" loading>
              중간 버튼
            </Button>
            <Button {...args} variant="solid" size="lg" loading>
              큰 버튼
            </Button>
          </div>
        </div>
        <div className={vstack({ gap: "8", alignItems: "center" })}>
          <p style={{ fontSize: "14px", color: "#666" }}>아웃라인 버튼</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button {...args} variant="outline" size="sm" loading>
              작은 버튼
            </Button>
            <Button {...args} variant="outline" size="md" loading>
              중간 버튼
            </Button>
            <Button {...args} variant="outline" size="lg" loading>
              큰 버튼
            </Button>
          </div>
        </div>
        <div className={vstack({ gap: "8", alignItems: "center" })}>
          <p style={{ fontSize: "14px", color: "#666" }}>다양한 색조</p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button {...args} variant="solid" tone="brand" loading>
              브랜드
            </Button>
            <Button {...args} variant="solid" tone="neutral" loading>
              중립
            </Button>
            <Button {...args} variant="solid" tone="danger" loading>
              위험
            </Button>
            <Button {...args} variant="solid" tone="success" loading>
              성공
            </Button>
            <Button {...args} variant="solid" tone="warning" loading>
              경고
            </Button>
            <Button {...args} variant="solid" tone="info" loading>
              정보
            </Button>
          </div>
        </div>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    loading: {
      control: false,
    },
  },
};
