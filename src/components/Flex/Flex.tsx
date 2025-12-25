import { createElement, type HTMLAttributes, type ReactNode } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import type { RecipeVariant } from "../../../styled-system/types";
import type { Spacing } from "../../tokens/spacing";

type As =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "aside"
  | "span";

export interface FlexProps
  extends HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof flexVariants>> {
  children: ReactNode;
  as?: As;
  gap?: Spacing;
}

export const Flex = ({
  children,
  as = "div",
  inline = false,
  direction = "row",
  wrap = "nowrap",
  justify = "start",
  align = "stretch",
  gap,
  className,
  ...props
}: FlexProps) => {
  const Component = as;

  return createElement(
    Component,
    {
      className: cx(
        flexVariants({
          inline,
          direction,
          wrap,
          justify,
          align,
        }),
        css({ gap }),
        className,
      ),
      ...props,
    },
    children,
  );
};

export const flexVariants = cva({
  base: {},
  variants: {
    inline: {
      true: { display: "inline-flex" },
      false: { display: "flex" },
    },
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      rowReverse: { flexDirection: "row-reverse" },
      columnReverse: { flexDirection: "column-reverse" },
    },
    wrap: {
      wrap: { flexWrap: "wrap" },
      nowrap: { flexWrap: "nowrap" },
      wrapReverse: { flexWrap: "wrap-reverse" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
      baseline: { alignItems: "baseline" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      evenly: { justifyContent: "space-evenly" },
    },
  },
  defaultVariants: {
    inline: false,
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "stretch",
  },
});
