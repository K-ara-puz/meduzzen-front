import CustomBtn from "../CustomBtn"

interface CommonWarningFormProps {
  apply: () => void,
  cancel: () => void,
  title: string
}
export const CommonWarningForm = ({apply, cancel, title}: CommonWarningFormProps) => {
  return (
    <div>
    <p className="text-center font-bold mb-5">{title}</p>
    <div className="flex gap-5">
      <CustomBtn title="Cancel" clickHandler={cancel} btnState="success"/>
      <CustomBtn title="Yes" clickHandler={apply} btnState="error"/>
    </div>
  </div>
  )
}