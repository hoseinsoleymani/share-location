import { useFormContext } from 'react-hook-form';

import { useLocationStore } from '../../store/store';
import { Button, DialogCloseButton, TextField } from '../shared';
import { LocationType } from './LocationType';
import { PointMap } from './PointMap';
import { UploadLogo } from './UploadLogo';

export const Form = () => {
  const saveLocation = useLocationStore((state) => state.saveLocation);
  const { register, handleSubmit, reset } = useFormContext();

  const submitForm = handleSubmit(({ name, type, logo }) => {
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
