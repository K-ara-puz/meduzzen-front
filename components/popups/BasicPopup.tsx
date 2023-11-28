"use client";
import { useRouter } from "next/navigation";
import { BasicPopupProps } from "../../interfaces/basicPopupProps.interface";

const BasicPopup = ({
  shouldShow,
  title,
  onRequestClose,
  children,
}: BasicPopupProps) => {
  const router = useRouter();
  const goHome = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    router.push("/")
  }
  return shouldShow
    ? (
        <div
          className="fixed flex items-center justify-center z-[1] h-full w-full bg-slate-400 bg-opacity-95 overflow-auto "
          onClick={onRequestClose}
        >
          <button onClick={(e) => goHome(e)} className="fixed top-5 left-5 z-40">→ Home</button>
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
