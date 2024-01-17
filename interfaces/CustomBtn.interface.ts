export interface CustomBtn extends React.ComponentPropsWithoutRef<"button"> {
  title?: string;
  btnState?: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  activeBtn?: boolean;
  disabled?: boolean;
}