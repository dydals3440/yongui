import type React from "react";
import type { HTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** 텍스트 */
  children: React.ReactNode;
  /** 타입 */
  type?: "button" | "submit";
  /** 클릭 시 실행함수 */
  onClick?: () => void;
  /** 종류 */
  variant: ButtonVariant;
  /** 색조 */
  tone?: Tone;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 로딩 상태 여부 */
  loading?: boolean;
}

/**
 * - `variant` 속성으로 버튼의 스타일 종류를 지정할 수 있습니다.
 * - `tone` 속성으로 버튼의 색상 강조를 지정할 수 있습니다.
 * - `size` 속성으로 버튼의 크기를 지정할 수 있습니다.
 * - `type` 속성으로 버튼의 타입을 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 버튼을 비활성화할 수 있습니다.
 * - `loading` 속성을 사용하여 로딩 상태를 표시할 수 있습니다. 로딩 중일 때는 자동으로 비활성화됩니다.
 */
const Spinner = ({
  size,
  variant,
}: {
  size: ButtonSize;
  variant: ButtonVariant;
}) => {
  const spinnerSize = {
    sm: "14",
    md: "16",
    lg: "20",
  }[size];

  return (
    <svg
      className={css({
        animationStyle: "spin",
        color: variant === "outline" ? "fg.neutral.placeholder" : "white",
      })}
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="로딩 중"
      role="img"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="15"
      />
    </svg>
  );
};

export const Button = ({
  children,
  type = "button",
  onClick,
  variant = "solid",
  tone = "brand",
  size = "md",
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ tone, variant, size, disabled, loading })}
      type={type}
      onClick={loading ? undefined : onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner size={size} variant={variant} /> : children}
    </button>
  );
};

export const buttonVariants = cva({
  base: {
    appearance: "none",
    margin: "0",
    fontWeight: 500,
    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ["auto", "100%"],
    borderRadius: "md",
    cursor: "pointer",
    transition: "0.2s",
    lineHeight: "1",
    outline: "0",
    "&:disabled": {
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineOffset: "2",
    },
  },
  variants: {
    size: {
      sm: {
        px: "24",
        py: "8",
        fontSize: "sm",
      },
      md: {
        px: "32",
        py: "12",
        fontSize: "md",
      },
      lg: {
        px: "40",
        py: "16",
        fontSize: "lg",
      },
    },
    variant: {
      solid: {},
      outline: {},
    },
    tone: {
      brand: {},
      neutral: {},
      danger: {},
      success: {},
      warning: {},
      info: {},
    },
    disabled: {
      true: {},
      false: {},
    },
    loading: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // Solid Variants
    {
      variant: "solid",
      tone: "brand",
      css: {
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
        "&:hover": {
          bg: "bgSolid.brand.hover",
        },
        "&:active": {
          bg: "bgSolid.brand.active",
        },
        "&:disabled": {
          bg: "bg.brand.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.brand.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "neutral",
      css: {
        bg: "bgSolid.neutral",
        color: "fgSolid.neutral",
        "&:hover": {
          bg: "bgSolid.neutral.hover",
        },
        "&:active": {
          bg: "bgSolid.neutral.active",
        },
        "&:disabled": {
          bg: "bg.neutral.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.neutral.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "danger",
      css: {
        bg: "bgSolid.danger",
        color: "fgSolid.danger",
        "&:hover": {
          bg: "bgSolid.danger.hover",
        },
        "&:active": {
          bg: "bgSolid.danger.active",
        },
        "&:disabled": {
          bg: "bg.danger.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.danger.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "success",
      css: {
        bg: "bgSolid.success",
        color: "fgSolid.success",
        "&:hover": {
          bg: "bgSolid.success.hover",
        },
        "&:active": {
          bg: "bgSolid.success.active",
        },
        "&:disabled": {
          bg: "bg.success.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.success.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "warning",
      css: {
        bg: "bgSolid.warning",
        color: "fgSolid.warning",
        "&:hover": {
          bg: "bgSolid.warning.hover",
        },
        "&:active": {
          bg: "bgSolid.warning.active",
        },
        "&:disabled": {
          bg: "bg.warning.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.warning.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "info",
      css: {
        bg: "bgSolid.info",
        color: "fgSolid.info",
        "&:hover": {
          bg: "bgSolid.info.hover",
        },
        "&:active": {
          bg: "bgSolid.info.active",
        },
        "&:disabled": {
          bg: "bg.info.disabled!",
          color: "fg.neutral.disabled",
          "&:hover": {
            bg: "bg.info.disabled!",
            color: "fg.neutral.disabled",
          },
        },
      },
    },
    // Outline Variants
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        borderWidth: "lg",
        color: "fg.brand",
        "&:hover": {
          bg: "bg.brand.hover",
          color: "fg.brand.hover",
        },
        "&:active": {
          bg: "bg.brand.active",
          color: "fg.brand.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "neutral",
        borderWidth: "lg",
        color: "fg.neutral",
        "&:hover": {
          bg: "bg.neutral.hover",
          color: "fg.neutral.hover",
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          bg: "bg.neutral.active",
          color: "fg.neutral.active",
          borderColor: "border.neutral.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "danger",
        borderWidth: "lg",
        color: "fg.danger",
        "&:hover": {
          bg: "bg.danger.hover",
        },
        "&:active": {
          bg: "bg.danger.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "success",
      css: {
        border: "success",
        borderWidth: "lg",
        color: "fg.success",
        "&:hover": {
          bg: "bg.success.hover",
        },
        "&:active": {
          bg: "bg.success.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "warning",
      css: {
        border: "warning",
        borderWidth: "lg",
        color: "fg.warning",
        "&:hover": {
          bg: "bg.warning.hover",
        },
        "&:active": {
          bg: "bg.warning.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "info",
      css: {
        border: "info",
        borderWidth: "lg",
        color: "fg.info",
        "&:hover": {
          bg: "bg.info.hover",
        },
        "&:active": {
          bg: "bg.info.active",
        },
        "&:disabled": {
          borderColor: "border.neutral.disabled",
          color: "fg.neutral.disabled",
          bg: "transparent",
          "&:hover": {
            borderColor: "border.neutral.disabled",
            color: "fg.neutral.disabled",
            bg: "transparent",
          },
        },
      },
    },
    // Loading States - use disabled colors when loading
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "brand",
      css: {
        bg: "bg.brand.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "neutral",
      css: {
        bg: "bg.neutral.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "danger",
      css: {
        bg: "bg.danger.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "success",
      css: {
        bg: "bg.success.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "warning",
      css: {
        bg: "bg.warning.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "solid",
      loading: true,
      disabled: true,
      tone: "info",
      css: {
        bg: "bg.info.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "outline",
      loading: true,
      disabled: true,
      css: {
        borderColor: "border.neutral.disabled",
        color: "fg.neutral.disabled",
        bg: "transparent",
      },
    },
    // Disabled States
    {
      variant: "solid",
      disabled: true,
      loading: false,
      css: {
        bg: "bg.neutral.disabled!",
        color: "fg.neutral.disabled",
      },
    },
    {
      variant: "outline",
      disabled: true,
      loading: false,
      css: {
        bg: "transparent",
        color: "fg.neutral.disabled",
        borderColor: "border.neutral.disabled",
      },
    },
  ],
});
