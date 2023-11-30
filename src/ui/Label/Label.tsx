import type { PropsWithChildren } from 'react';
import React from 'react';

export const Label = ({
  children,
  ...props
}: PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => {
  return (
    <label
      className="inline-block whitespace-nowrap text-sm font-medium"
      {...props}
    >
      {children}
    </label>
  );
};
