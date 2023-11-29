import React, { PropsWithChildren } from 'react';

export const Label = ({
  children,
  ...props
}: PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => {
  return (
    <label
      className="whitespace-nowrap inline-block bg-primary-white text-sm font-medium text-shades-90"
      {...props}
    >
      {children}
    </label>
  );
};
