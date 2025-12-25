/**
 * @fileoverview YongUI 간격 토큰
 *
 * 4px 기반의 간격 스케일입니다.
 * margin, padding, gap 등 레이아웃 속성에 사용됩니다.
 */
import type { Tokens } from "@pandacss/types";

/**
 * 간격 스케일 (4px 기반)
 *
 * | 토큰 | 값 | 픽셀 |
 * |------|-----|------|
 * | 0 | 0rem | 0px |
 * | 2 | 0.125rem | 2px |
 * | 4 | 0.25rem | 4px |
 * | 8 | 0.5rem | 8px |
 * | 12 | 0.75rem | 12px |
 * | 16 | 1rem | 16px |
 * | 20 | 1.25rem | 20px |
 * | 24 | 1.5rem | 24px |
 * | 32 | 2rem | 32px |
 * | 36 | 2.25rem | 36px |
 * | 40 | 2.5rem | 40px |
 * | 48 | 3rem | 48px |
 *
 * @example
 * ```tsx
 * <Box p="16" gap="8" />
 * ```
 */
export const spacing: Tokens["spacing"] = {
  0: { value: "0rem" },
  2: { value: "0.125rem" },
  4: { value: "0.25rem" },
  8: { value: "0.5rem" },
  12: { value: "0.75rem" },
  16: { value: "1rem" },
  20: { value: "1.25rem" },
  24: { value: "1.5rem" },
  32: { value: "2rem" },
  36: { value: "2.25rem" },
  40: { value: "2.5rem" },
  48: { value: "3rem" },
};

/** 간격 토큰 키 타입 (0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 36 | 40 | 48) */
export type Spacing = keyof typeof spacing;
