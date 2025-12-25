import type { ReactNode } from "react";
import { Flex, type FlexProps } from "../Flex/Flex";

export interface HStackProps extends Omit<FlexProps, "direction"> {
  children: ReactNode;
}

export const HStack = ({ children, ...props }: HStackProps) => {
  return (
    <Flex direction="row" {...props}>
      {children}
    </Flex>
  );
};
