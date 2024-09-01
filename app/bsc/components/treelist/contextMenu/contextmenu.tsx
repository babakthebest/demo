import React, { SetStateAction, useRef } from "react";
type Options = {
  name: string;
  callback: () => void;
};
type Cordinates = {
  x: number;
  y: number;
};
type Props = {
  options: Options[];
  coordinates: Cordinates;
  contextMenu: boolean;
  // setContextMenu: (value: SetStateAction<boolean>) => void;
  hideContextMenu: () => void;
};

export default function ContextMenu({
  options,
  contextMenu,
  hideContextMenu,
  coordinates,
}: Props) {
  const contextMenuRef = useRef(null);

  if (!contextMenu) {
    // Wait until ref is set before rendering
    return null;
  }

  return (
    <>
      {contextMenu && (
        <div
          onClick={hideContextMenu}
          onContextMenu={(e) => e.preventDefault()}
          className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[99]'></div>
      )}
      <div
        className={`bg-[#171c1f] fixed py-2 z-[100] rounded-lg shadow-lg w-36`}
        style={{
          top: coordinates.y,
          left: coordinates.x,
        }}
        onContextMenu={(e) => e.preventDefault()}
        ref={contextMenuRef}>
        <ul>
          {options.map(({ name, callback }) => (
            <li
              className='px-4 py-2 hover:bg-[#2a2d30] cursor-pointer '
              key={name}
              onClick={(e) => {
                e.stopPropagation();
                hideContextMenu();
                callback();
              }}>
              <span className=' text-white font-thin'>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
