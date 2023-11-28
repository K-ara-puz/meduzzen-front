import { CustomBtn } from "../interfaces/CustomBtn";

const CustomBtn = (props: CustomBtn) => {
  return (
    <button
      onClick={(e) => props.clickHandler(e)}
      className={btnClasses[props.btnState]}
      type={props.type ? props.type : 'button'}
    >
      {props.title}
    </button>
  );
};

const btnClasses = {
  success: "bg-green-500 text-white py-1 px-5 rounded-md w-full",
  error: "bg-red-500 text-white py-1 px-5 rounded-md w-full",
  gray: "bg-gray-500 text-white py-1 px-5 rounded-md w-full",
};

export default CustomBtn;
