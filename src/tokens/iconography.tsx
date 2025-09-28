import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  CodeXml,
  ExternalLink,
  Eye,
  EyeClosed,
  EyeOff,
  HandHeart,
  HeartHandshake,
  Info,
  Menu,
  MessageCircle,
  MessageCircleMore,
  Moon,
  Search,
  Star,
  Sun,
  ThumbsUp,
  User,
  X,
} from "lucide-react";
import type { ComponentProps, FunctionComponent, SVGProps } from "react";
import LinkedIn from "../assets/LinkedIn.svg?react";

function createBrandIcon(Icon: FunctionComponent<SVGProps<SVGSVGElement>>) {
  return (args: ComponentProps<typeof Icon>) => (
    <Icon {...args} fill="currentColor" />
  );
}

export const icons = {
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleAlert: CircleAlert,
  clock: Clock,
  codeXml: CodeXml,
  externalLink: ExternalLink,
  eye: Eye,
  eyeClosed: EyeClosed,
  eyeOff: EyeOff,
  handHeart: HandHeart,
  heartHandshake: HeartHandshake,
  info: Info,
  menu: Menu,
  messageCircle: MessageCircle,
  messageCircleMore: MessageCircleMore,
  moon: Moon,
  search: Search,
  star: Star,
  sun: Sun,
  thumbsUp: ThumbsUp,
  user: User,
  x: X,
  LinkedIn: createBrandIcon(LinkedIn),
};

export type IconName = keyof typeof icons;
