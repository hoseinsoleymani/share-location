import { PropsWithChildren } from 'react';
import { Label } from '../Label/Label';

interface FormGroupProps {
  label: string;
}

export const FormGroup = ({
  children,
  label,
}: PropsWithChildren<FormGroupProps>) => {
  return (
    <div className="flex gap-4 flex-col">
      <Label>{label}</Label>
      {children}
    </div>
  );
};
