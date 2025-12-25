/**
 * @fileoverview YongUI 테두리 토큰
 *
 * 컴포넌트의 border, outline 스타일을 정의합니다.
 * 시맨틱 색상과 연동되어 톤별로 일관된 테두리를 제공합니다.
 */
import type { Tokens } from "@pandacss/types";

/**
 * 시맨틱 테두리 프리셋
 *
 * 각 톤(neutral, brand, danger 등)에 맞는 테두리 스타일입니다.
 * 색상은 시맨틱 색상 토큰과 연동됩니다.
 *
 * @example
 * ```tsx
 * <Box border="neutral" />
 * <Input border="danger" />
 * ```
 */
export const borders: Tokens["borders"] = {
  neutral: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.neutral}",
      style: "solid",
    },
  },
  brand: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.brand}",
      style: "solid",
    },
  },
  danger: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.danger}",
      style: "solid",
    },
  },
  success: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.success}",
      style: "solid",
    },
  },
  warning: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.warning}",
      style: "solid",
    },
  },
  info: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.info}",
      style: "solid",
    },
  },
};

/**
 * 테두리 두께
 *
 * | 토큰 | 값 | 용도 |
 * |------|-----|------|
 * | sm | 1px | 기본 테두리 |
 * | md | 1.5px | 강조 테두리 |
 * | lg | 2px | 포커스 링 |
 */
export const borderWidths: Tokens["borderWidths"] = {
  sm: { value: "1px" },
  md: { value: "1.5px" },
  lg: { value: "2px" },
};

/** 테두리 토큰 키 타입 */
export type Border = keyof typeof borders;

/** 테두리 두께 토큰 키 타입 */
export type BorderWidth = keyof typeof borderWidths;
