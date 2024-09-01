import { useState } from "react";

export const useContextMenu = () => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
  };

  const hideContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  return {
    isContextMenuVisible,
    contextMenuCoordinates,
    showContextMenu,
    hideContextMenu,
  };
};
