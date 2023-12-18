import { CustomBtn } from "../interfaces/CustomBtn.interface";

const CustomBtn = (props: CustomBtn) => {
  return (
    <button
      onClick={(e) => props.clickHandler(e)}
      className={btnClasses[props.btnState]}
      type={props.type ? props.type : "button"}
    >
      {props.title}
    </button>
  );
};

const btnClasses = {
  success: "bg-green-500 text-xs sm:text-base text-white whitespace-nowrap py-1 px-5 rounded-md w-full h-full",
  error: "bg-red-500 text-xs sm:text-base text-white whitespace-nowrap py-1 px-5 rounded-md w-full h-full",
  gray: "bg-gray-500 text-xs sm:text-base text-white whitespace-nowrap py-1 px-5 rounded-md w-full h-full",
};

export default CustomBtn;
