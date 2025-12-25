import type { HTMLAttributes, ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTone = Tone;
type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;
type Align = "left" | "center" | "right";
type WordBreak = "eng" | "cjk";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 텍스트 */
  children: ReactNode;
  /** 단계 */
  level: Level;
  /** 크기 */
  size?: HeadingSize;
  /** 색조 */
  tone?: HeadingTone;
  /** 텍스트 정렬 */
  align?: Align;
  /** 단어 줄바꿈 방식 */
  wordBreak?: WordBreak;
}

/**
 * Heading 컴포넌트
 *
 * 시맨틱한 제목 요소(h1~h6)를 렌더링하는 컴포넌트입니다.
 *
 * @param {1 | 2 | 3 | 4 | 5 | 6} level - 렌더링할 HTML 요소의 레벨
 *   - 각 레벨은 기본 텍스트 스타일이 자동으로 적용됩니다
 *
 * @param {1 | 2 | 3 | 4 | 5 | 6} [size] - 텍스트 크기 (선택사항)
 *   - level과 독립적으로 텍스트 크기를 조정할 수 있습니다
 *   - level과 함께 사용 시 size가 우선적으로 적용됩니다
 *   - 예: <Heading level={1} size={3}> → h1 태그지만 heading.3 스타일 적용
 *
 * @param {Tone} [tone='neutral'] - 텍스트 색상 (선택사항)
 *   - 'brand' | 'neutral' | 'danger' | 'success' | 'warning' | 'info'
 *
 * @param {'left' | 'center' | 'right' | 'justify'} [align] - 텍스트 정렬 (선택사항)
 *
 * @param {'eng' | 'cjk'} [wordBreak] - 단어 줄바꿈 규칙 (선택사항)
 *   - 'eng': 영어 단어 단위로 줄바꿈 (word-break: normal)
 *   - 'cjk': 한중일(CJK) 문자 단위로 줄바꿈 (word-break: keep-all)
 *
 * @example
 * // h1 태그, 기본 스타일
 * <Heading level={1}>제목</Heading>
 *
 * @example
 * // h2 태그이지만 h4 크기의 스타일 적용
 * <Heading level={2} size={4}>부제목</Heading>
 *
 * @example
 * // 강조 색상과 중앙 정렬
 * <Heading level={1} tone="brand" align="center">브랜드 제목</Heading>
 */
export const Heading = ({
  children,
  level,
  size,
  tone = "neutral",
  align,
  wordBreak,
  ...rest
}: HeadingProps) => {
  if (!level) {
    throw new Error(
      "Heading level is required and you can cause accessibility issues",
    );
  }

  const Tag = `h${level}` as const;

  return (
    <Tag
      className={css(
        headingVariants.raw({
          level: size ? undefined : level,
          tone,
          align,
          wordBreak,
        }),
        size &&
          css.raw({
            textStyle: `heading.${size}`,
          }),
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const headingVariants = cva({
  variants: {
    level: {
      1: { textStyle: "heading.1" },
      2: { textStyle: "heading.2" },
      3: { textStyle: "heading.3" },
      4: { textStyle: "heading.4" },
      5: { textStyle: "heading.5" },
      6: { textStyle: "heading.6" },
    },
    tone: {
      brand: {
        color: "fg.brand",
      },
      neutral: {
        color: "fg.neutral",
      },
      danger: {
        color: "fg.danger",
      },
      success: {
        color: "fg.success",
      },
      warning: {
        color: "fg.warning",
      },
      info: {
        color: "fg.info",
      },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
      justify: { textAlign: "justify" },
    },
    wordBreak: {
      eng: { wordBreak: "normal" },
      cjk: { wordBreak: "keep-all" },
    },
  },
});
