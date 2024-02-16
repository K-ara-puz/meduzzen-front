import { store } from "../store/store";

export const validationRules = {
  required: (value: unknown) => (value ? undefined : "Required"),
  email: (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined,
  confirmPass: (value: string) => {
    const { form } = store.getState();
    if (value !== form.registerForm.values.password)
      return "Passwords must be equals";
    return undefined;
  },
  minLength: (value: string) => {
    if (value && value.length < 3) {
      return `Must be more than 3 characters` 
    }
    return undefined
  },
  maxLength: (value: string) => {
    if (value && value.length > 20) {
      return `Must be less than 20 characters` 
    }
    return undefined
  },
  minLength10: (value: string) => {
    if (value && value.length < 10) {
      return `Must be more than 10 characters` 
    }
    return undefined
  },
  maxLength100: (value: string) => {
    if (value && value.length > 100) {
      return `Must be less than 100 characters` 
    }
    return undefined
  }
}