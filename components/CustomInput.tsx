import { customInput } from "@/interfaces/customInput.interface";

const CustomInput = (props: customInput) => {
  return (
    <div>
      <label htmlFor="">{props.label}</label>
      <input value={props.value} name={props.name} onChange={(e) => props.afterChange(e)} type={props.type} className="bg-transparent focus:outline-none border-b-2 w-full border-slate-300"/>
    </div>
  )
};
export default CustomInput;
