import * as React from "react";
import { iRightClickContext } from "../ts/interfaces";

export const RightClickContext = React.createContext<{
  menuId: number;
  setMenuId: React.Dispatch<React.SetStateAction<number>>;
}>({
  menuId: 0,
  setMenuId: () => {}
});

export const useRightClickContext = (props: iRightClickContext) => {
  const rightClickContext = React.useContext(RightClickContext);
  const ref = React.useRef({ id: props.id });
  const handleRightClick = React.useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      props.setCloseMenu(false);
      rightClickContext.setMenuId(ref.current.id);
    },
    [rightClickContext, props]
  );
  React.useEffect(() => {
    const elem = document.getElementById(ref.current.id.toString());
    if (elem) {
      elem.addEventListener("contextmenu", handleRightClick);
    }
    return () => {
      if (elem) {
        elem.removeEventListener("contextmenu", handleRightClick);
      }
    };
  }, [ref, handleRightClick]);

  return {
    ref,
    rightClickContext
  };
};
