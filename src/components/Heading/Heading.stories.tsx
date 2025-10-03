import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Heading } from "./Heading";

export default {
  component: Heading,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fRoCtJ2314DZWKzsJGYxI2/%EB%84%88%EA%B5%AC%EB%94%94?t=MQ9OO3KpZyZ2NJc0-0",
    },
  },
  args: {
    children: "제목",
    level: 1,
    tone: "neutral",
  },
  argTypes: {
    children: {
      control: "text",
      description: "제목 텍스트",
    },
    level: {
      control: "select",
      description: "제목 단계",
    },
    size: {
      control: "select",
      description: "제목 크기",
    },
    tone: {
      control: "select",
      description: "제목의 색조",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "텍스트 정렬",
    },
    wordBreak: {
      control: "select",
      options: ["eng", "cjk"],
      description: "단어 줄바꿈",
    },
  },
} satisfies Meta<typeof Heading>;

export const Basic: StoryObj<typeof Heading> = {};

export const Levels: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} level={1}>
          1 단계
        </Heading>
        <Heading {...args} level={2}>
          2 단계
        </Heading>
        <Heading {...args} level={3}>
          3 단계
        </Heading>
        <Heading {...args} level={4}>
          4 단계
        </Heading>
        <Heading {...args} level={5}>
          5 단계
        </Heading>
        <Heading {...args} level={6}>
          6 단계
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    level: {
      control: false,
    },
  },
};

export const Tones: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} tone="neutral">
          중립 색조
        </Heading>
        <Heading {...args} tone="brand">
          브랜드 색조
        </Heading>
        <Heading {...args} tone="danger">
          위험 색조
        </Heading>
        <Heading {...args} tone="success">
          성공 색조
        </Heading>
        <Heading {...args} tone="warning">
          경고 색조
        </Heading>
        <Heading {...args} tone="info">
          정보 색조
        </Heading>
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

export const Sizes: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} size={1}>
          제목
        </Heading>
        <Heading {...args} size={2}>
          제목
        </Heading>
        <Heading {...args} size={3}>
          제목
        </Heading>
        <Heading {...args} size={4}>
          제목
        </Heading>
        <Heading {...args} size={5}>
          제목
        </Heading>
        <Heading {...args} size={6}>
          제목
        </Heading>
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

export const Alignments: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div
        className={vstack({
          gap: "16",
          maxWidth: "200px",
        })}
      >
        <Heading {...args} align="left">
          텍스트를 왼쪽 정렬된 제목
        </Heading>
        <Heading {...args} align="center">
          텍스트를 가운데 정렬된 제목
        </Heading>
        <Heading {...args} align="right">
          텍스트를 오른쪽 정렬된 제목
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    align: {
      control: false,
    },
  },
};

export const WordBreaks: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div
        className={vstack({
          gap: "16",
          maxWidth: "200px",
        })}
      >
        <Heading {...args} wordBreak="eng">
          english line break
        </Heading>
        <Heading {...args} wordBreak="cjk">
          한글은 단어 단위로 줄바꿈됩니다.
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    wordBreak: {
      control: false,
    },
  },
};
