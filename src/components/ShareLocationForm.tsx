import { useLocationStore } from '@store/';
import type { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogTitle,
  TextField,
} from '../ui';
import { LocationLogo } from './LocationLogo';
import { LocationOnMap } from './LocationOnMap';
import { LocationType } from './LocationType';

interface ShareLocationFormProps {
  closePopup: () => void;
}

export const ShareLocationForm = ({ closePopup }: ShareLocationFormProps) => {
  const saveLocation = useLocationStore((state) => state.saveLocation);
  const removeCurrentPosition = useLocationStore(
    (state) => state.removeCurrentPosition,
  );

  const { register, handleSubmit, setError, reset } = useFormContext();

  const submitForm = handleSubmit(({ name, type, logo }) => {
    if (!logo || logo.length === 0)
      return setError('logo', { message: 'upload image' });

    saveLocation(logo, name, type);
    reset();
    closePopup();
  });

  return (
    <form onSubmit={submitForm} className="flex max-w-xl flex-col gap-y-5">
      <TextField {...register('name')} name="name" label="Location name:" />

      <LocationOnMap />

      <LocationType />

      <LocationLogo />

      <div className="flex justify-end gap-x-4 pt-10">
        <DialogCloseButton
          onClick={() => {
            reset();
            removeCurrentPosition();
          }}
          className="p-4 text-blue-600"
        >
          Cancel
        </DialogCloseButton>
        <Button type="submit">Save location</Button>
      </div>
    </form>
  );
};

interface ShareLocationPopupProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

export const ShareLocationPopup = ({
  showPopup,
  setShowPopup,
}: ShareLocationPopupProps) => {
  const { reset } = useFormContext();

  const removeCurrentPosition = useLocationStore(
    (state) => state.removeCurrentPosition,
  );

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent
        onInteractOutside={() => {
          reset();
          removeCurrentPosition();
        }}
      >
        <DialogTitle className="mb-6 mt-0">Share location</DialogTitle>

        <ShareLocationForm closePopup={closePopup} />
      </DialogContent>
    </Dialog>
  );
};
