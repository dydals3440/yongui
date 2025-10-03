import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Icon } from "./Icon";

export default {
  component: Icon,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fRoCtJ2314DZWKzsJGYxI2/%EB%84%88%EA%B5%AC%EB%94%94?t=MQ9OO3KpZyZ2NJc0-0",
    },
  },
  args: {
    name: "thumbsUp",
  },
  argTypes: {
    size: {
      control: "select",
      description: "아이콘의 크기",
    },
    tone: {
      control: "select",
      description: "아이콘의 색조",
    },
  },
} satisfies Meta<typeof Icon>;

export const Basic: StoryObj<typeof Icon> = {};

export const Sizes: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} size="xs" />
        <Icon {...args} size="sm" />
        <Icon {...args} size="md" />
        <Icon {...args} size="lg" />
      </div>
    );
  },
  argTypes: { size: { control: false } },
};

export const Tones: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} tone="neutral" />
        <Icon {...args} tone="brand" />
        <Icon {...args} tone="danger" />
        <Icon {...args} tone="warning" />
        <Icon {...args} tone="success" />
        <Icon {...args} tone="info" />
      </div>
    );
  },
  argTypes: { tone: { control: false } },
};
