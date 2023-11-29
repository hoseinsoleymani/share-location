import type {
  DialogContentProps,
  DialogTitleProps,
} from '@radix-ui/react-dialog';
import {
  DialogContent as DialogContentBase,
  DialogOverlay,
  DialogPortal,
  DialogTitle as DialogTitleBase,
} from '@radix-ui/react-dialog';

export {
  Dialog,
  DialogClose as DialogCloseButton,
  DialogDescription,
  DialogTrigger,
} from '@radix-ui/react-dialog';

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogTitleBase
      className={`mb-6 mt-0 text-xl font-bold text-gray-900 ${className}`}
      {...props}
    />
  );
};

export const DialogContent = ({
  children,
  className,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-[999999] overflow-y-auto bg-gray-200/50">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogContentBase
            className="min-w-[600px] max-w-md scale-100 overflow-hidden bg-white p-6 text-left align-middle text-gray-600 opacity-100 shadow-xl transition-all"
            {...props}
          >
            {children}
          </DialogContentBase>
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
};
