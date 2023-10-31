"use client";
import { basicPopupProps } from "@/interfaces/basicPopupProps.interface";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BasicPopup = ({
  shouldShow,
  title,
  onRequestClose,
  children,
}: basicPopupProps) => {
  return <div>sdlfhs</div>

  // const [mounted, setMounted] = useState(false);
  // let modalPlace = document.querySelector('body')!;

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // return shouldShow && mounted
  //   ? createPortal(
  //       <div
  //         className="fixed flex items-center justify-center z-[1] h-full w-full bg-slate-950 bg-opacity-95 overflow-auto "
  //         onClick={onRequestClose}
  //       >
  //         <div
  //           className="w-3/4 p-5 bg-slate-500 rounded-lg max-w-sm"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //           }}
  //         >
  //           <div className="flex justify-between mb-3">
  //             <p>{title}</p>
  //             <button className="text-xl" onClick={onRequestClose}>
  //               X
  //             </button>
  //           </div>
  //           {children}
  //         </div>
  //       </div>,
  //       modalPlace
  //     )
  //   : null;
};
export default BasicPopup;
