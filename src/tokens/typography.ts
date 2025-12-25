/**
 * @fileoverview YongUI 타이포그래피 토큰
 *
 * Pretendard Variable 폰트 기반의 한글 최적화 타이포그래피 시스템입니다.
 * display, title, body, label, caption, code, heading 스타일을 제공합니다.
 */
import type { Tokens } from "@pandacss/types";

/**
 * 텍스트 스타일 프리셋
 *
 * | 스타일 | 용도 | 크기 |
 * |-------|------|------|
 * | `display` | 히어로, 대형 제목 | lg/md/sm |
 * | `title` | 섹션 제목 | lg/md/sm |
 * | `body` | 본문 텍스트 | lg/md/sm |
 * | `label` | 폼 라벨, 버튼 | lg/md/sm + underline/strong |
 * | `caption` | 보조 텍스트 | - |
 * | `code` | 코드 블록 | - |
 * | `heading` | HTML 헤딩 (h1-h6) | 1-6 |
 */
export const textStyles = {
  display: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "8xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "7xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "5xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
  },
  title: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "4xl",
        fontWeight: "semibold",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "3xl",
        fontWeight: "semibold",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "2xl",
        fontWeight: "medium",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
  },
  body: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "lg",
        fontWeight: "normal",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "md",
        fontWeight: "normal",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "sm",
        fontWeight: "semibold",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
  },
  label: {
    lg: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "lg",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "lg",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
    },
    md: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
      strong: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "semibold",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
    },
    sm: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "sm",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "sm",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
    },
  },
  caption: {
    value: {
      fontFamily: "sans",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "tight",
      letterSpacing: "balanced",
    },
  },
  code: {
    value: {
      fontFamily: "mono",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "balanced",
      letterSpacing: "balanced",
    },
  },
  heading: {
    "1": {
      value: {
        fontFamily: "sans",
        fontSize: "3xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "2": {
      value: {
        fontFamily: "sans",
        fontSize: "2xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "3": {
      value: {
        fontFamily: "sans",
        fontSize: "xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "4": {
      value: {
        fontFamily: "sans",
        fontSize: "lg",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "5": {
      value: {
        fontFamily: "sans",
        fontSize: "md",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "6": {
      value: {
        fontFamily: "sans",
        fontSize: "sm",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
  },
};

/** 폰트 패밀리 - sans(Pretendard), mono(JetBrains Mono) */
const _fonts = {
  sans: { value: '"Pretendard Variable", sans-serif' },
  mono: { value: '"JetBrains Mono", monospace' },
} satisfies Tokens["fonts"];

export const fonts = _fonts;

/** 폰트 굵기 (400-700) */
const _fontWeights = {
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
} satisfies Tokens["fontWeights"];

export const fontWeights = _fontWeights;

/** 폰트 굵기 타입 */
export type FontWeight = keyof typeof _fontWeights;

/** 폰트 크기 (xs: 12px ~ 8xl: 72px) */
const _fontSizes = {
  xs: { value: "0.75rem" }, // 12px
  sm: { value: "0.875rem" }, // 14px
  md: { value: "1rem" }, // 16px
  lg: { value: "1.125rem" }, // 18px
  xl: { value: "1.25rem" }, // 20px
  "2xl": { value: "1.5rem" }, // 24px
  "3xl": { value: "1.875rem" }, // 30px
  "4xl": { value: "2.25rem" }, // 36px
  "5xl": { value: "2.75rem" }, // 44px
  "6xl": { value: "3.25rem" }, // 52px
  "7xl": { value: "3.75rem" }, // 60px
  "8xl": { value: "4.5rem" }, // 72px
} satisfies Tokens["fontSizes"];

export const fontSizes = _fontSizes;

/** 폰트 크기 타입 */
export type FontSize = keyof typeof _fontSizes;

/** 자간 - tight(-0.1), balanced(0) */
const _letterSpacings = {
  tight: { value: "-0.1" },
  balanced: { value: "0" },
} satisfies Tokens["letterSpacings"];

export const letterSpacings = _letterSpacings;

/** 행간 - tight(1.2), balanced(1.5) */
const _lineHeights = {
  tight: { value: "1.2" },
  balanced: { value: "1.5" },
} satisfies Tokens["lineHeights"];

export const lineHeights = _lineHeights;
