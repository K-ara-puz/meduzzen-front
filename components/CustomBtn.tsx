import { CustomBtn } from "../interfaces/CustomBtn.interface";

const CustomBtn = (props: CustomBtn) => {
  const getClasses = () => {
    if (props.activeBtn) return `${btnClasses[props.btnState]} ${btnClasses.activeBtn}`
    return `${btnClasses[props.btnState]}`
  }
  return (
    <button
      onClick={(e) => props.clickHandler(e)}
      className={getClasses()}
      type={props.type ? props.type : "button"}
    >
      {props.title}
    </button>
  );
};

const btnClasses = {
  success: "btn-standard bg-green-500",
  error: "btn-standard bg-red-500",
  gray: "btn-standard bg-gray-500",
  purple: "btn-standard bg-purple-500",
  activeBtn: "btn-standard bg-green-500"
};

export default CustomBtn;
