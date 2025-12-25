import type { ComponentPropsWithoutRef, Ref } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { vstack } from "../../../styled-system/patterns";
import { Icon, type IconProps } from "../Icon/Icon";

export type TextInputSize = "sm" | "md" | "lg";

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** 입력 필드의 크기 */
  size?: TextInputSize;
  /** 입력 필드 위에 표시할 라벨 텍스트 */
  label?: string;
  /** 필수 입력 여부 (라벨 옆에 * 표시) */
  required?: boolean;
  /** 입력값의 유효성 검사 실패 여부 */
  invalid?: boolean;
  /** 입력 필드 왼쪽에 표시할 아이콘 */
  leadingIcon?: IconProps["name"];
  /** 입력 필드 오른쪽에 표시할 아이콘 */
  trailingIcon?: IconProps["name"];
  /** 입력 필드가 비어있을 때 표시되는 안내 텍스트 */
  placeholder?: string;
  /** 입력 필드 아래에 표시할 도움말 텍스트 */
  helperText?: string;
  /** 유효성 검사 실패 시 표시할 오류 메시지 */
  errorText?: string;
  /** 입력 필드의 고유 식별자 */
  id?: string;
  /** input 요소에 대한 React ref */
  ref?: Ref<HTMLInputElement>;
}

export const textInputVariants = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    w: "full",
    borderStyle: "solid",
    borderColor: "border.neutral",
    borderWidth: "md",
    borderRadius: "sm",
    bg: "appBg",
    transitionProperty: "background-color, box-shadow border-color,",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",

    _focusWithin: {
      borderColor: "border.brand.focus",
      boxShadow: "0 0 0 3px token(colors.border.brand.focus / 0.2)",
    },

    "&[data-disabled]": {
      pointerEvents: "none",
      bg: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
  },
  variants: {
    size: {
      sm: {
        h: "10",
        px: "12",
        columnGap: "8",
        fontSize: "sm",
      },
      md: {
        h: "12",
        px: "12",
        columnGap: "8",
        fontSize: "md",
      },
      lg: {
        h: "14",
        px: "16",
        columnGap: "12",
        fontSize: "lg",
      },
    },
    invalid: {
      true: {
        borderColor: "border.danger",
        _focusWithin: {
          borderColor: "border.danger",
          boxShadow: "0 0 0 3px token(colors.border.danger / 0.2)",
        },
      },
      false: {
        _hover: {
          borderColor: "border.neutral.hover",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const inputStyles = cva({
  base: {
    flex: 1,
    w: "full",
    h: "full",
    bg: "transparent",
    color: "fg.neutral",
    outline: "none",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",

    _placeholder: {
      color: "fg.neutral.placeholder",
    },

    _disabled: {
      color: "fg.neutral.disabled",
      pointerEvents: "none",
    },
  },
});

const labelStyles = cva({
  base: {
    color: "fg.neutral",
    fontWeight: "medium",
    cursor: "pointer",
  },
  variants: {
    size: {
      sm: {
        textStyle: "label.sm",
      },
      md: {
        textStyle: "label.md",
      },
      lg: {
        textStyle: "label.lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const messageStyles = cva({
  base: {
    textStyle: "caption",
  },
  variants: {
    invalid: {
      true: {
        color: "fg.danger",
      },
      false: {
        color: "fg.neutral.placeholder",
      },
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

/**
 * TextInput 컴포넌트
 *
 * 사용자가 텍스트를 입력할 수 있는 단일 줄 입력 필드입니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <TextInput placeholder="이름을 입력하세요" />
 *
 * // 라벨과 필수 입력 표시
 * <TextInput label="이메일" required placeholder="example@email.com" />
 *
 * // 도움말 텍스트
 * <TextInput label="비밀번호" helperText="8자 이상 입력해주세요" />
 *
 * // 오류 상태와 오류 메시지
 * <TextInput label="이메일" invalid errorText="올바른 이메일 형식이 아닙니다" />
 *
 * // 크기 변형
 * <TextInput size="sm" placeholder="작은 크기" />
 * <TextInput size="lg" placeholder="큰 크기" />
 * ```
 */
export function TextInput({
  size = "md",
  label,
  required,
  invalid,
  className,
  leadingIcon,
  trailingIcon,
  helperText,
  errorText,
  disabled,
  id,
  ref,
  ...rest
}: TextInputProps) {
  const inputId = id || rest.name || "text-input";
  const messageId = `${inputId}-message`;
  const showMessage = (invalid && errorText) || helperText;

  const renderIcon = (name: IconProps["name"]) => {
    let tone: IconProps["tone"];

    if (disabled) {
      tone = "neutral";
    } else if (invalid) {
      tone = "danger";
    }

    return (
      <Icon name={name} size="md" tone={tone} data-testid={`icon-${name}`} />
    );
  };

  return (
    <div className={vstack({ gap: "4", alignItems: "flex-start", w: "full" })}>
      {label && (
        <label
          htmlFor={inputId}
          className={css({
            display: "flex",
            gap: "4",
            alignItems: "center",
          })}
        >
          <span className={labelStyles({ size })}>{label}</span>
          {required && (
            <span
              className={css({
                color: "fg.danger",
                fontSize: "inherit",
              })}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cx(textInputVariants({ invalid, size }), className)}
        data-disabled={disabled ? "" : undefined}
      >
        {leadingIcon && renderIcon(leadingIcon)}
        <input
          id={inputId}
          className={inputStyles()}
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid ? true : undefined}
          aria-required={required ? true : undefined}
          aria-describedby={showMessage ? messageId : undefined}
          {...rest}
        />
        {trailingIcon && renderIcon(trailingIcon)}
      </div>

      {showMessage && (
        <p id={messageId} className={messageStyles({ invalid: !!invalid })}>
          {invalid && errorText ? errorText : helperText}
        </p>
      )}
    </div>
  );
}
