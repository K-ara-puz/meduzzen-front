import { TextField } from "@mui/material";

export const renderTextField = ({
  input,
  label,
  name,
  meta: { touched, error, warning },
  ...custom
}) => {
  return (
    <div className="flex flex-col">
      <TextField
        label={label}
        error={error && touched ? true : false}
        variant="outlined"
        {...input}
        {...custom}
      />
      {touched &&
        ((error && <span className="text-red-500">{error}</span>) ||
          (warning && <span className="text-yellow-600">{warning}</span>))}
    </div>
  );
};