import { Slot } from '@radix-ui/react-slot';
import type { InputHTMLAttributes, Ref } from 'react';
import React, { isValidElement, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  invalid?: boolean;
  errorId: string;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  ref: Ref<any>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      asChild,
      invalid,
      'aria-describedby': ariaDescribedby,
      'aria-errormessage': areaErrorMessage,
      id,
      value,
      errorId,
      disabled,
      hasStartIcon,
      placeholder,
      hasEndIcon,
      ...props
    },
    ref,
  ) => {
    const Element = asChild ? Slot : 'input';
    return (
      <Element
        {...props}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        className={`block h-full w-full rounded-lg border-0 p-0 py-3.5 outline-none focus:ring-0 sm:text-sm ${
          hasStartIcon ? 'pl-9' : 'pl-4'
        }
       ${hasEndIcon ? 'pr-9' : 'pr-4'}
      `}
        aria-describedby={ariaDescribedby}
        aria-invalid={invalid}
        id={id}
        value={value}
        aria-errormessage={areaErrorMessage}
      />
    );
  },
);

interface TextFieldDescriptionProps {
  description: string;
  id: string;
  visuallyShow: boolean | undefined;
}

const TextFieldDescription = ({
  description,
  id,
  visuallyShow,
}: TextFieldDescriptionProps) => {
  return description ? (
    <p id={id} className={visuallyShow ? 'sr-only' : 'text-shades-30 text-sm'}>
      {description}
    </p>
  ) : null;
};

interface TextFieldLabelProps {
  label: string;
  textFieldId: string;
}

const TextFieldLabel = ({ label, textFieldId }: TextFieldLabelProps) => {
  return (
    <label
      htmlFor={textFieldId}
      className="bg-primary-white text--90 absolute -top-7 left-0 z-10 -mt-px inline-block text-sm font-medium"
    >
      {label}
    </label>
  );
};

interface TextFieldErrorMessageProps {
  id: string;
  message: string;
}

const TextFieldErrorMessage = ({ id, message }: TextFieldErrorMessageProps) => {
  return (
    <span id={id} className="text-red-60 ml-3 text-sm">
      {message}
    </span>
  );
};

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        className="border-shades-30 relative mt-6 h-28 w-full rounded-lg border py-3.5 pl-4 shadow-sm outline-none focus-within:ring-1 focus-within:ring-blue-100 focus:border-blue-100"
        {...props}
      />
    );
  },
);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  invalid?: boolean;
  errorMessage?: string;
  maxLength?: number;
  label?: string;
  StartIcon?: any;
  EndIcon?: any;
  asChild?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      description,
      invalid,
      errorMessage,
      asChild,
      label,
      value,
      StartIcon,
      EndIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const descriptionId = `textField-description-${id}`;
    const errorId = `textField-error-${id}`;
    const textFieldId = `textField-${id}`;
    return (
      <div
        className={`border-shades-20 relative mt-6 h-10 rounded-lg border focus-within:ring-1 focus:border-blue-100 focus:ring-blue-100 ${
          invalid
            ? 'border-red-60 bg-red-70/5 border hover:bg-red-100'
            : 'border-shades-20 bg-primary-white border'
        } ${className ?? ''}`}
      >
        {label ? (
          <TextFieldLabel label={label} textFieldId={textFieldId} />
        ) : null}

        <div className="relative h-full w-full">
          {StartIcon ? (
            <StartIcon
              className="text-shades-20 absolute left-[10px] top-1/2 w-5 -translate-y-1/2"
              aria-label="start icon"
            />
          ) : null}

          <Input
            {...props}
            ref={ref}
            asChild={asChild}
            invalid={invalid}
            aria-describedby={`${descriptionId}`}
            aria-errormessage={invalid ? errorId : undefined}
            id={textFieldId}
            errorId={errorId}
            hasStartIcon={Boolean(StartIcon)}
            hasEndIcon={Boolean(EndIcon)}
          />

          {EndIcon && !isValidElement(EndIcon) ? (
            <EndIcon
              aria-label="end icon"
              className="absolute right-[18px] top-1/2 -translate-y-1/2"
            />
          ) : null}

          {EndIcon && isValidElement(EndIcon) ? (
            <span className="absolute right-[18px] top-1/2 -translate-y-1/2">
              {EndIcon}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex h-[10px] justify-between">
          {invalid && errorMessage ? (
            <TextFieldErrorMessage message={errorMessage} id={errorId} />
          ) : null}

          {description ? (
            <TextFieldDescription
              id={descriptionId}
              description={description}
              visuallyShow={errorMessage ? invalid : undefined}
            />
          ) : null}
        </div>
      </div>
    );
  },
);
