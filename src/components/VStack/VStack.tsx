import type { ReactNode } from "react";
import { Flex, type FlexProps } from "../Flex/Flex";

export interface VStackProps extends Omit<FlexProps, "direction"> {
  children: ReactNode;
}

export const VStack = ({ children, ...props }: VStackProps) => {
  return (
    <Flex direction="column" {...props}>
      {children}
    </Flex>
  );
};
