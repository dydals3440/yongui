import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { vstack } from "../../../styled-system/patterns";
import { Box } from "./Box";

/** 데모용 Box 기본 스타일 */
const demoStyle = css({
  border: "1px dashed",
  borderColor: "border.neutral",
  borderRadius: "8",
  bg: "bg.neutral/50",
});

/** 데모용 내부 콘텐츠 스타일 */
const contentStyle = css({
  bg: "bg.brand",
  color: "fg.onColor",
  p: "8",
  borderRadius: "4",
  fontWeight: "medium",
  fontSize: "14",
});

export default {
  component: Box,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "div",
        "section",
        "article",
        "main",
        "aside",
        "header",
        "footer",
        "nav",
        "span",
      ],
      description: "렌더링할 HTML 요소",
    },
    padding: {
      control: "select",
      options: [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48],
      description: "내부 여백 (spacing 토큰)",
    },
    margin: {
      control: "select",
      options: [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48],
      description: "외부 여백 (spacing 토큰)",
    },
    width: {
      control: "text",
      description: "너비 (CSS 크기 값)",
    },
    height: {
      control: "text",
      description: "높이 (CSS 크기 값)",
    },
  },
  args: {
    as: "div",
    padding: 16,
    className: demoStyle,
    children: <span className={contentStyle}>Box 콘텐츠</span>,
  },
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

/** 기본 사용법 */
export const Basic: Story = {};

/** 내부 여백을 설정합니다. spacing 토큰을 사용합니다. */
export const Padding: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16" })}>
      {([0, 8, 16, 24, 32, 48] as const).map((paddingValue) => (
        <div key={paddingValue}>
          <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
            padding: {paddingValue}
          </h4>
          <Box {...args} padding={paddingValue}>
            <span className={contentStyle}>콘텐츠</span>
          </Box>
        </div>
      ))}
    </div>
  ),
  argTypes: {
    padding: { control: false },
  },
};

/** 외부 여백을 설정합니다. spacing 토큰을 사용합니다. */
export const Margin: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16" })}>
      {([0, 8, 16, 24, 32] as const).map((marginValue) => (
        <div
          key={marginValue}
          className={css({
            border: "1px solid",
            borderColor: "border.neutral",
            bg: "bg.neutral/30",
          })}
        >
          <h4 className={css({ p: "8", fontWeight: "semibold" })}>
            margin: {marginValue}
          </h4>
          <Box {...args} margin={marginValue} padding={8}>
            <span className={contentStyle}>콘텐츠</span>
          </Box>
        </div>
      ))}
    </div>
  ),
  argTypes: {
    margin: { control: false },
  },
};

/** 너비와 높이를 CSS 크기 값으로 설정합니다. */
export const Size: Story = {
  render: (args) => (
    <div className={vstack({ gap: "24" })}>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          width: 200px
        </h4>
        <Box {...args} width="200px" padding={16}>
          <span className={contentStyle}>고정 너비</span>
        </Box>
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          width: 100%, height: 100px
        </h4>
        <Box {...args} width="100%" height="100px" padding={16}>
          <span className={contentStyle}>전체 너비, 고정 높이</span>
        </Box>
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          width: fit-content
        </h4>
        <Box {...args} width="fit-content" padding={16}>
          <span className={contentStyle}>콘텐츠에 맞춤</span>
        </Box>
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          width: auto (기본값)
        </h4>
        <Box {...args} width="auto" padding={16}>
          <span className={contentStyle}>자동 너비</span>
        </Box>
      </div>
    </div>
  ),
  argTypes: {
    width: { control: false },
    height: { control: false },
  },
};

/** `as` prop으로 시맨틱 HTML 요소를 지정합니다. */
export const SemanticElements: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16" })}>
      {(
        [
          "div",
          "section",
          "article",
          "header",
          "footer",
          "nav",
          "aside",
          "main",
          "span",
        ] as const
      ).map((element) => (
        <Box key={element} {...args} as={element} padding={12}>
          <span className={contentStyle}>&lt;{element}&gt;</span>
        </Box>
      ))}
    </div>
  ),
  argTypes: {
    as: { control: false },
  },
};

/** 실제 사용 예시: 카드 레이아웃 */
export const CardExample: Story = {
  render: () => (
    <Box
      as="article"
      padding={24}
      width="300px"
      className={css({
        border: "1px solid",
        borderColor: "border.neutral",
        borderRadius: "12",
        bg: "bg.neutral",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      })}
    >
      <h3 className={css({ fontWeight: "bold", fontSize: "18", mb: "8" })}>
        카드 제목
      </h3>
      <p className={css({ color: "fg.neutral.muted", fontSize: "14" })}>
        Box 컴포넌트를 사용하여 카드 레이아웃을 구성할 수 있습니다. padding과
        시맨틱 요소를 활용합니다.
      </p>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

/** 실제 사용 예시: 섹션 레이아웃 */
export const SectionExample: Story = {
  render: () => (
    <Box
      as="section"
      padding={32}
      width="400px"
      className={css({
        bg: "bg.neutral/50",
        borderRadius: "8",
      })}
    >
      <Box as="header" padding={8} margin={0}>
        <h2 className={css({ fontWeight: "bold", fontSize: "20" })}>
          섹션 헤더
        </h2>
      </Box>
      <Box padding={16}>
        <p className={css({ fontSize: "14", lineHeight: "1.6" })}>
          Box 컴포넌트를 중첩하여 시맨틱한 구조를 유지하면서 레이아웃을 구성할
          수 있습니다.
        </p>
      </Box>
      <Box as="footer" padding={8}>
        <span className={css({ fontSize: "12", color: "fg.neutral.muted" })}>
          섹션 푸터
        </span>
      </Box>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};
