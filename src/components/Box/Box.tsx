import type React from "react";
import type { PropsWithChildren } from "react";
import { css, cx } from "../../../styled-system/css";
import type { Spacing } from "../../tokens/spacing";

type As =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "span";

type CSSSize =
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}vw`
  | `${number}vh`
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "100%";

export interface BoxProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** 내부 여백 (spacing 토큰) */
  padding?: Spacing;
  /** 외부 여백 (spacing 토큰) */
  margin?: Spacing;
  /** 너비 (CSS 크기 값) */
  width?: CSSSize;
  /** 높이 (CSS 크기 값) */
  height?: CSSSize;
}

/**
 * Box 컴포넌트
 *
 * 기본 레이아웃을 구성하는 다형성(polymorphic) 컨테이너 컴포넌트입니다.
 *
 * - `as` (기본값: 'div') - 렌더링할 HTML 요소
 *   - 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav' | 'span'
 *   - 시맨틱 HTML 구조를 유지하면서 스타일링할 수 있습니다
 *
 * - `padding` - 내부 여백 (선택사항)
 *   - 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 36 | 40 | 48
 *   - spacing 토큰 기반으로 일관된 간격을 적용합니다
 *
 * - `margin` - 외부 여백 (선택사항)
 *   - 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 36 | 40 | 48
 *   - spacing 토큰 기반으로 일관된 간격을 적용합니다
 *
 * - `width` - 너비 (선택사항)
 *   - CSS 크기 값: '100px', '50%', '100vw', 'auto', 'fit-content' 등
 *
 * - `height` - 높이 (선택사항)
 *   - CSS 크기 값: '200px', '100vh', 'auto', 'fit-content' 등
 *
 * @example
 * // 기본 사용
 * <Box padding={16}>콘텐츠</Box>
 *
 * @example
 * // 시맨틱 요소로 렌더링
 * <Box as="section" padding={24} margin={16}>
 *   <h2>섹션 제목</h2>
 *   <p>섹션 내용</p>
 * </Box>
 *
 * @example
 * // 크기 지정
 * <Box width="100%" height="200px" padding={16}>
 *   고정 높이 컨테이너
 * </Box>
 */
export const Box = ({
  children,
  as = "div",
  padding,
  margin,
  width,
  height,
  className,
  ...rest
}: BoxProps) => {
  const Component = as;

  const baseStyle = css({
    padding,
    margin,
  });

  const inlineStyle: React.CSSProperties = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <Component
      className={cx(baseStyle, className)}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
