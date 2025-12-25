/**
 * @fileoverview YongUI 애니메이션 스타일
 *
 * 컴포넌트에 적용할 수 있는 사전 정의된 애니메이션입니다.
 * 로딩, 전환, 피드백 등 다양한 인터랙션에 사용됩니다.
 */
import { defineAnimationStyles } from "@pandacss/dev";

/**
 * 애니메이션 스타일 프리셋
 *
 * | 카테고리 | 스타일 | 용도 |
 * |---------|--------|------|
 * | 회전 | spin, spin-fast, spin-slow | 로딩 스피너 |
 * | 강조 | pulse, bounce | 주의 환기, 알림 |
 * | 페이드 | fade-in, fade-out | 요소 표시/숨김 |
 * | 슬라이드 | slide-from-* | 드롭다운, 모달 |
 * | 스케일 | scale-in, scale-out | 팝오버, 툴팁 |
 *
 * @example
 * ```tsx
 * <Spinner animationStyle="spin" />
 * <Modal animationStyle="fade-in" />
 * ```
 */
export const animationStyles = defineAnimationStyles({
  spin: {
    value: {
      animation: "spin 1s linear infinite",
    },
  },
  "spin-fast": {
    value: {
      animation: "spin 0.5s linear infinite",
    },
  },
  "spin-slow": {
    value: {
      animation: "spin 2s linear infinite",
    },
  },
  pulse: {
    value: {
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  bounce: {
    value: {
      animation: "bounce 1s infinite",
    },
  },
  "fade-in": {
    value: {
      animation: "fade-in 0.2s ease-out",
    },
  },
  "fade-out": {
    value: {
      animation: "fade-out 0.2s ease-in",
    },
  },
  "slide-from-top": {
    value: {
      animation: "slide-from-top 0.3s ease-out",
    },
  },
  "slide-from-bottom": {
    value: {
      animation: "slide-from-bottom 0.3s ease-out",
    },
  },
  "slide-from-left": {
    value: {
      animation: "slide-from-left 0.3s ease-out",
    },
  },
  "slide-from-right": {
    value: {
      animation: "slide-from-right 0.3s ease-out",
    },
  },
  "scale-in": {
    value: {
      animation: "scale-in 0.2s ease-out",
    },
  },
  "scale-out": {
    value: {
      animation: "scale-out 0.2s ease-in",
    },
  },
});

/** 애니메이션 스타일 키 타입 */
export type AnimationStyle = keyof typeof animationStyles;
