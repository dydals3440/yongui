/**
 * @fileoverview YongUI 모서리 둥글기 토큰
 *
 * 컴포넌트의 border-radius 값을 정의합니다.
 * xs(2px)부터 full(원형)까지 9단계 스케일을 제공합니다.
 */
import type { Tokens } from "@pandacss/types";

/**
 * 모서리 둥글기 스케일
 *
 * | 토큰 | 값 | 픽셀 | 용도 |
 * |------|-----|------|------|
 * | xs | 0.125rem | 2px | 미세한 둥글림 |
 * | sm | 0.25rem | 4px | 인풋, 태그 |
 * | md | 0.375rem | 6px | 카드, 버튼 |
 * | lg | 0.5rem | 8px | 모달, 드롭다운 |
 * | xl | 0.75rem | 12px | 대형 컨테이너 |
 * | 2xl | 1rem | 16px | - |
 * | 3xl | 1.5rem | 24px | - |
 * | 4xl | 2rem | 32px | - |
 * | full | infinity | 완전 원형 | 아바타, 뱃지 |
 */
export const radii: Tokens["radii"] = {
  xs: { value: "0.125rem" },
  sm: { value: "0.25rem" },
  md: { value: "0.375rem" },
  lg: { value: "0.5rem" },
  xl: { value: "0.75rem" },
  "2xl": { value: "1rem" },
  "3xl": { value: "1.5rem" },
  "4xl": { value: "2rem" },
  full: { value: "calc(infinity * 1px)" },
};

/** 모서리 둥글기 토큰 키 타입 */
export type Radii = keyof typeof radii;
