import type { SVGProps } from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { type IconName, icons } from "../../tokens/iconography";

type Size = "xs" | "sm" | "md" | "lg";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 렌더링할 아이콘의 이름 */
  name: IconName;
  /** 아이콘에 적용할 색조 */
  tone?: Tone;
  /** 아이콘의 표시 크기 */
  size?: Size;
}

/**
 * Icon 컴포넌트
 *
 * Lucide 기반의 SVG 아이콘을 렌더링하는 컴포넌트입니다.
 *
 * @param {IconName} name - 표시할 아이콘의 이름
 *   - iconography 토큰에 정의된 아이콘 이름 중 하나를 선택합니다
 *   - 존재하지 않는 이름을 전달하면 물음표 아이콘(circleHelp)이 fallback으로 표시됩니다
 *
 * @param {'xs' | 'sm' | 'md' | 'lg'} [size='md'] - 아이콘의 크기 (선택사항)
 *   - xs: 0.75rem (12px)
 *   - sm: 1rem (16px)
 *   - md: 1.25rem (20px) - 기본값
 *   - lg: 1.5rem (24px)
 *
 * @param {Tone} [tone] - 아이콘의 색조 (선택사항)
 *   - 'brand' | 'neutral' | 'danger' | 'success' | 'warning' | 'info'
 *   - 미지정 시 부모 요소의 색상(currentColor)을 상속합니다
 *
 * @example
 * // 기본 아이콘
 * <Icon name="thumbsUp" />
 *
 * @example
 * // 크기와 색조 지정
 * <Icon name="check" size="lg" tone="success" />
 *
 * @example
 * // 버튼 내부에서 사용
 * <button>
 *   <Icon name="search" size="sm" aria-hidden="true" />
 *   검색
 * </button>
 */
export const Icon = ({ name, size, tone, ...rest }: IconProps) => {
  const Tag = icons[name] ?? icons.circleHelp;

  return (
    <Tag
      role="img"
      aria-label={name}
      className={iconVariants({ size, tone })}
      {...rest}
    />
  );
};

export const iconVariants = cva({
  base: { display: "inline-block", color: "currentcolor" },
  variants: {
    size: {
      xs: { width: "0.75rem", height: "0.75rem" },
      sm: { width: "1rem", height: "1rem" },
      md: { width: "1.25rem", height: "1.25rem" },
      lg: { width: "1.5rem", height: "1.5rem" },
    },
    tone: {
      brand: { color: "fg.brand" },
      neutral: { color: "fg.neutral" },
      success: { color: "fg.success" },
      warning: { color: "fg.warning" },
      danger: { color: "fg.danger" },
      info: { color: "fg.info" },
    },
  },
  defaultVariants: { size: "md" },
});
