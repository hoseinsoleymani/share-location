import type { PropsWithChildren } from 'react';

import { Label } from '../Label/Label';

interface FormGroupProps {
  label: string;
}

export const FormGroup = ({
  children,
  label,
}: PropsWithChildren<FormGroupProps>) => {
  return (
    <div className="flex flex-col gap-4">
      <Label>{label}</Label>
      {children}
    </div>
  );
};
