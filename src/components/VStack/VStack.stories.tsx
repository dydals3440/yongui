import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { VStack } from "./VStack";

/** 데모용 VStack 컨테이너 스타일 */
const containerStyle = css({
  width: "200px",
  height: "250px",
  border: "1px dashed",
  borderColor: "border.neutral",
  borderRadius: "8",
  bg: "bg.neutral/50",
});

/** 데모용 자식 요소 스타일 객체 */
const itemStyleProps = {
  px: "12",
  py: "8",
  bg: "bg.brand",
  color: "fg.onColor",
  borderRadius: "4",
  fontWeight: "medium",
  fontSize: "14",
} as const;

/** 데모용 자식 요소 스타일 */
const itemStyle = css(itemStyleProps);

export default {
  component: VStack,
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
        "header",
        "footer",
        "main",
        "nav",
        "aside",
        "span",
      ],
      description: "렌더링할 HTML 요소",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
      description: "주축 정렬 방식",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
      description: "교차축 정렬 방식",
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrapReverse"],
      description: "줄바꿈 방식",
    },
    gap: {
      control: "select",
      options: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
      description: "아이템 간 간격 (spacing 토큰)",
    },
    inline: {
      control: "boolean",
      description: "inline-flex로 렌더링",
    },
  },
  args: {
    justify: "start",
    align: "stretch",
    wrap: "nowrap",
    gap: 8,
    inline: false,
    className: containerStyle,
    children: (
      <>
        <span className={itemStyle}>A</span>
        <span className={itemStyle}>B</span>
        <span className={itemStyle}>C</span>
      </>
    ),
  },
} satisfies Meta<typeof VStack>;

type Story = StoryObj<typeof VStack>;

/** 기본 사용법 */
export const Basic: Story = {};

/** 주축(main axis) 정렬 방식을 설정합니다. VStack에서는 세로 방향이 주축입니다. */
export const Justify: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "24" })}>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>start</h4>
        <VStack {...args} justify="start" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>center</h4>
        <VStack {...args} justify="center" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>end</h4>
        <VStack {...args} justify="end" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>between</h4>
        <VStack {...args} justify="between" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>around</h4>
        <VStack {...args} justify="around" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>evenly</h4>
        <VStack {...args} justify="evenly" />
      </div>
    </div>
  ),
  argTypes: {
    justify: { control: false },
  },
};

/** 교차축(cross axis) 정렬 방식을 설정합니다. VStack에서는 가로 방향이 교차축입니다. */
export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "24" })}>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>start</h4>
        <VStack {...args} align="start" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>center</h4>
        <VStack {...args} align="center" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>end</h4>
        <VStack {...args} align="end" />
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>stretch</h4>
        <VStack {...args} align="stretch">
          <span className={itemStyle}>A</span>
          <span className={itemStyle}>B</span>
          <span className={itemStyle}>C</span>
        </VStack>
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>baseline</h4>
        <VStack {...args} align="baseline">
          <span className={css({ ...itemStyleProps, fontSize: "12" })}>
            Small
          </span>
          <span className={css({ ...itemStyleProps, fontSize: "20" })}>
            Large
          </span>
          <span className={css({ ...itemStyleProps, fontSize: "16" })}>
            Medium
          </span>
        </VStack>
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
};

/** 아이템 간 간격을 설정합니다. spacing 토큰을 사용합니다. */
export const Gap: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "24" })}>
      {([0, 4, 8, 16, 24, 32] as const).map((gapValue) => (
        <div key={gapValue}>
          <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
            gap: {gapValue}
          </h4>
          <VStack {...args} gap={gapValue} />
        </div>
      ))}
    </div>
  ),
  argTypes: {
    gap: { control: false },
  },
  args: {
    className: css({
      width: "fit-content",
      border: "1px dashed",
      borderColor: "border.neutral",
      borderRadius: "8",
      bg: "bg.neutral/50",
      p: "8",
    }),
  },
};

/** `inline` prop으로 inline-flex와 flex를 전환합니다. */
export const Inline: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          inline=false (block)
        </h4>
        <div
          className={css({
            border: "1px solid",
            borderColor: "border.neutral",
            p: "8",
          })}
        >
          <VStack {...args} inline={false}>
            <span className={itemStyle}>A</span>
            <span className={itemStyle}>B</span>
          </VStack>
          <span>다음 텍스트</span>
        </div>
      </div>
      <div>
        <h4 className={css({ mb: "8", fontWeight: "semibold" })}>
          inline=true
        </h4>
        <div
          className={css({
            border: "1px solid",
            borderColor: "border.neutral",
            p: "8",
          })}
        >
          <VStack {...args} inline={true}>
            <span className={itemStyle}>A</span>
            <span className={itemStyle}>B</span>
          </VStack>
          <span>다음 텍스트</span>
        </div>
      </div>
    </div>
  ),
  argTypes: {
    inline: { control: false },
  },
  args: {
    className: undefined,
    gap: 8,
  },
};
