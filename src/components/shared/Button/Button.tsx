import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { mergeClassNames } from '../../../helpers';
import type { SVGIcon } from '../../types';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'medium' | 'normal' | 'sm';

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'disabled'
  > {
  StartIcon?: SVGIcon;
  EndIcon?: SVGIcon;
  asChild?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      StartIcon,
      EndIcon,
      disabled,
      variant = 'primary',
      size = 'medium',
      ...props
    },
    ref,
  ) => {
    const Element = asChild ? Slot : 'button';

    return (
      <div className="relative">
        {StartIcon ? (
          <StartIcon
            className={`${getButtonIconClassNames(variant)} ${
              size === 'sm' ? 'left-[6px]' : 'left-[14px]'
            }`}
            aria-label="start icon"
          />
        ) : null}

        <Element
          ref={ref}
          {...props}
          className={`${getButtonClassNames(variant, size, disabled)}`}
          disabled={disabled}
        />

        {EndIcon ? (
          <EndIcon
            aria-label="end icon"
            className={`${getButtonIconClassNames(variant)} ${
              size === 'sm' ? 'right-[6px]' : 'right-[14px]'
            }`}
          />
        ) : null}
      </div>
    );
  },
);

function getButtonClassNames(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean | undefined,
) {
  return mergeClassNames({
    'rounded-full focus:ring-4 focus:ring-cobalt-15 text-xs md:text-md flex justify-center transition-all w-full':
      true,
    'text-primary-white bg-blue-90 hover:bg-blue-100 active:bg-blue-100 focus:outline':
      variant === 'primary',
    'border border-shades-20 focus:outline bg-primary-white hover:bg-auxiliary-30 text-primary-black':
      variant === 'secondary',
    'py-2	px-6': size === 'sm',
    'py-3.5  px-8': size === 'medium',
    'py-4  px-8': size === 'normal',
    'opacity-25	pointer-events-none bg-blue-10':
      disabled && variant === 'primary',
    'opacity-25	pointer-events-none border border-shades-20 text-primary-black bg-primary-white':
      disabled && variant === 'secondary',
  });
}

function getButtonIconClassNames(variant: ButtonVariant) {
  return mergeClassNames({
    'absolute top-1/2 -translate-y-1/2 pointer-events-none w-full': true,
    'text-white': variant === 'primary',
    'text-accent': variant === 'secondary',
  });
}
