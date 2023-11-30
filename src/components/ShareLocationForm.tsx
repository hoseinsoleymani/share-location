import { useLocationStore } from '@store/';
import type { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

import { LocationType } from './LocationType';
import { PointMap } from './PointMap';
import {
  Button,
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogTitle,
  TextField,
} from './shared';
import { UploadLogo } from './UploadLogo';

export const ShareLocationForm = () => {
  const saveLocation = useLocationStore((state) => state.saveLocation);
  const { register, handleSubmit, setError, reset } = useFormContext();

  const submitForm = handleSubmit(({ name, type, logo }) => {
    if (!logo || logo.length === 0)
      return setError('logo', { message: 'upload image' });

    saveLocation(logo, name, type);
    reset();
  });

  return (
    <form onSubmit={submitForm} className="flex max-w-xl flex-col gap-y-5">
      <TextField {...register('name')} name="name" label="Location name:" />

      <PointMap />

      <LocationType />

      <UploadLogo />

      <div className="flex justify-end gap-x-4 pt-10">
        <DialogCloseButton
          onClick={() => reset()}
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
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ShareLocationPopup = ({
  showModal,
  setShowModal,
}: ShareLocationPopupProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogTitle className="mb-6 mt-0">Share location</DialogTitle>

        <ShareLocationForm />
      </DialogContent>
    </Dialog>
  );
};
