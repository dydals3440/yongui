import { ChevronDown } from "lucide-react";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

interface DropdownItemProps {
  id: string;
  text: string;
}

interface DropdownProps {
  items: DropdownItemProps[];
  // trigger
  isOpen: boolean;
  // 실제 선택
  selectedIndex: number;
  // 키보드 포커스
  focusedIndex: number;
}

type DropdownDispatchProps = {
  setItems: Dispatch<SetStateAction<DropdownItemProps[]>>;
  toggle: (force?: boolean) => void;
  selectIndex: Dispatch<SetStateAction<number>>;
  focusIndex: Dispatch<SetStateAction<number>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
};

type KeyEventHandler = (
  event: React.KeyboardEvent,
  props: Pick<DropdownProps, "focusedIndex" | "items"> &
    Pick<DropdownDispatchProps, "focusIndex" | "selectIndex" | "toggle">,
) => void;

const KeyEventMap: Partial<Record<KeyboardEvent["key"], KeyEventHandler>> = {
  ArrowUp: (_event, { focusIndex, items }) => {
    focusIndex((prev) => {
      // 더 돌지않는것
      //  Math.max(prev - 1, 0);

      // 뺑글뺑글 도는것 캐러젤
      return (items.length + prev - 1) % items.length;
    });
  },
  ArrowDown: (_event, { focusIndex, items }) => {
    // focusIndex((prev) => Math.min(prev + 1, items.length - 1));
    focusIndex((prev) => (items.length + prev + 1) % items.length);
  },
  Enter: (_event, { selectIndex, focusedIndex }) => {
    // 기본적으로 Enter를 누르면, Select가 열고 닫힘. Select Box에 포커스가 되어있기 때문이다.
    // event.preventDefault();
    selectIndex(focusedIndex);
  },
  Escape: (_event, { toggle }) => {
    toggle(false);
  },
};

const DropdownContext = createContext<DropdownProps>({
  isOpen: false,
  focusedIndex: -1,
  selectedIndex: -1,
  items: [],
});

const DropdownDispatchContext = createContext<DropdownDispatchProps>({
  setItems: () => {},
  toggle: () => {},
  selectIndex: () => {},
  focusIndex: () => {},
  handleKeyDown: () => {},
});

const useDropdown = () => useContext(DropdownContext);

const useSetDropdown = () => useContext(DropdownDispatchContext);

const DropdownContextProvider = ({
  children,
  defaultItems,
}: PropsWithChildren<{ defaultItems: DropdownItemProps[] }>) => {
  const [items, setItems] = useState<DropdownItemProps[]>(defaultItems);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, focusIndex] = useState(-1);
  const [selectedIndex, selectIndex] = useState(-1);

  const toggle = (force?: boolean) => {
    setIsOpen((prev) => (typeof force === "boolean" ? force : !prev));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    const handler = KeyEventMap[key];

    if (handler) {
      handler(event, {
        focusedIndex,
        focusIndex,
        selectIndex,
        toggle,
        items,
      });
    }
  };

  return (
    <DropdownContext.Provider
      value={{ items, isOpen, focusedIndex, selectedIndex }}
    >
      <DropdownDispatchContext.Provider
        value={{ setItems, toggle, focusIndex, selectIndex, handleKeyDown }}
      >
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

const DropdownContainer = ({ children }: PropsWithChildren) => {
  return <div className={containerStyle}>{children}</div>;
};

interface DropdownTriggerProps {
  tone?: Tone;
  placeholder?: string;
}

const DropdownTrigger = ({
  tone = "neutral",
  placeholder = "항목을 선택해주세요",
}: DropdownTriggerProps) => {
  const { selectedIndex, items, isOpen } = useDropdown();
  const { toggle, handleKeyDown } = useSetDropdown();
  const selectedItem = items[selectedIndex];

  return (
    <button
      className={triggerVariants({ tone })}
      type="button"
      onClick={() => toggle()}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <span className={triggerTextStyle}>
        {selectedItem?.text || placeholder}
      </span>
      <ChevronDown
        size={16}
        className={css({
          transition: "0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        })}
      />
    </button>
  );
};

const DropdownItem = ({
  item,
  index,
  itemsRef,
}: {
  item: DropdownItemProps;
  index: number;
  itemsRef: RefObject<(HTMLDivElement | null)[]>;
}) => {
  const { selectedIndex, focusedIndex } = useDropdown();
  const { selectIndex, toggle } = useSetDropdown();

  const isSelected = selectedIndex === index;
  const isFocused = focusedIndex === index;

  return (
    <div
      className={itemStyle({ selected: isSelected, focused: isFocused })}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      ref={(r) => {
        if (itemsRef.current) itemsRef.current[index] = r;
      }}
      onClick={() => {
        selectIndex(index);
        toggle(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          selectIndex(index);
          toggle(false);
        }
      }}
    >
      {item.text}
    </div>
  );
};

const DropdownList = () => {
  const { items, isOpen, focusedIndex } = useDropdown();
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // focusedIndex가 변경되면, focusedIndex에 해당하는 아이템으로 접근 (list에 focus)
  useEffect(() => {
    itemsRef.current?.[focusedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [focusedIndex]);

  if (!isOpen) return null;

  return (
    <div className={listStyle} role="listbox">
      {items.map((item, idx) => (
        <DropdownItem
          key={item.id}
          item={item}
          index={idx}
          itemsRef={itemsRef}
        />
      ))}
    </div>
  );
};

export const Dropdown = {
  Provider: DropdownContextProvider,
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  List: DropdownList,
  Item: DropdownItem,
};

// Styles
const containerStyle = css({
  position: "relative",
  display: "inline-block",
});

const triggerVariants = cva({
  base: {
    appearance: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8",
    minWidth: "12rem",
    padding: "8 12",
    backgroundColor: "transparent",
    border: "neutral",
    borderWidth: "lg",
    borderRadius: "sm",
    cursor: "pointer",
    transition: "0.2s",
    outline: "none",
    "&:hover": {
      bg: "bg.neutral.hover",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineOffset: "2",
    },
    "&:disabled": {
      borderColor: "border.neutral.disabled",
      cursor: "not-allowed",
      color: "fg.neutral.disabled",
    },
  },
  variants: {
    tone: {
      brand: {
        color: "fg.brand",
        borderColor: "border.brand",
      },
      neutral: {
        color: "fg.neutral",
        borderColor: "border.neutral",
      },
      danger: {
        color: "fg.danger",
        borderColor: "border.danger",
      },
      warning: {
        color: "fg.warning",
        borderColor: "border.warning",
      },
      success: {
        color: "fg.success",
        borderColor: "border.success",
      },
      info: {
        color: "fg.info",
        borderColor: "border.info",
      },
    },
  },
});

const triggerTextStyle = css({
  fontSize: "sm",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const listStyle = css({
  position: "absolute",
  top: "100%",
  left: "0",
  right: "0",
  marginTop: "4",
  padding: "4",
  backgroundColor: "bg.neutral",
  border: "neutral",
  borderWidth: "lg",
  borderRadius: "sm",
  boxShadow: "md",
  listStyle: "none",
  zIndex: "10",
  maxHeight: "15rem",
  overflowY: "auto",
});

const itemStyle = cva({
  base: {
    display: "block",
    width: "100%",
    padding: "8 12",
    fontSize: "sm",
    textAlign: "left",
    borderRadius: "sm",
    cursor: "pointer",
    "&:hover": {
      bg: "bg.neutral.hover",
    },
  },
  variants: {
    selected: {
      true: {
        bg: "bg.brand",
        color: "fg.brand",
      },
    },
    focused: {
      true: {
        bg: "bg.neutral.hover",
      },
    },
  },
});
