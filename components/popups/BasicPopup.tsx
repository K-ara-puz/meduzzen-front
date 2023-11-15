"use client";

import { BasicPopupProps } from "../../interfaces/basicPopupProps.interface";

const BasicPopup = ({
  shouldShow,
  title,
  onRequestClose,
  children,
}: BasicPopupProps) => {
  return shouldShow
    ? (
        <div
          className="fixed flex items-center justify-center z-[1] h-full w-full bg-slate-400 bg-opacity-95 overflow-auto "
          onClick={onRequestClose}
        >
          <div
            className="w-3/4 p-5 bg-white rounded-lg max-w-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between mb-3">
              <p>{title}</p>
              <button className="text-xl" onClick={onRequestClose}>
                X
              </button>
            </div>
            {children}
          </div>
        </div>
      )
    : null;
};
export default BasicPopup;
