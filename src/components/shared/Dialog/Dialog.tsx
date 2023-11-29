import {
  DialogPortal,
  DialogOverlay,
  DialogTitle as DialogTitleBase,
  DialogContent as DialogContentBase,
  DialogTitleProps,
  DialogContentProps,
} from '@radix-ui/react-dialog';

export {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogClose as DialogCloseButton,
} from '@radix-ui/react-dialog';

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogTitleBase
      className={`mt-0 mb-6 text-xl font-bold text-gray-900 ${className}`}
      {...props}
    />
  );
}

export function DialogContent({
  children,
  className,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-[999999] overflow-y-auto bg-gray-200/50">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogContentBase
            className="min-w-[600px] max-w-md scale-100 transform overflow-hidden bg-white p-6 text-left align-middle text-gray-600 opacity-100 shadow-xl transition-all"
            {...props}
          >
            {children}
          </DialogContentBase>
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
}
