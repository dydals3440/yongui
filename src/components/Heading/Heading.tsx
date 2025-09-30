import type { HTMLAttributes, ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTone = Tone;
type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 텍스트 */
  children: ReactNode;
  /** 단계 */
  level: Level;
  /** 크기 */
  size?: HeadingSize;
  /** 색조 */
  tone?: HeadingTone;
}

export const Heading = ({
  children,
  level,
  size,
  tone = "neutral",
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
        styles.raw({ level: size ? undefined : level, tone }),
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

const styles = cva({
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
  },
});
