import type { FieldAttributes } from 'formik';

export 
interface InputPhoneProps extends FieldAttributes<any> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}