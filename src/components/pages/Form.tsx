import { Button, DialogCloseButton, TextField } from '../shared';
import { LocationType } from './LocationType';
import { UploadLogo } from './UploadLogo';
import { useLocationStore } from '../../store/store';
import { PointMap } from './PointMap';
import { useFormContext } from 'react-hook-form';

export const Form = () => {
  const saveLocation = useLocationStore((state) => state.saveLocation);
  const { register, handleSubmit, reset } = useFormContext();

  const submitForm = handleSubmit(({ name, type, logo }) => {
    saveLocation(logo, name, type);
    reset();
  });

  return (
    <form onSubmit={submitForm} className="max-w-xl gap-y-5 flex flex-col">
      <TextField {...register('name')} name="name" label="Location name:" />

      <PointMap />

      <LocationType />

      <UploadLogo />

      <div className="flex justify-end gap-x-4 pt-10">
        <DialogCloseButton className="text-blue-600 p-4">
          Cancel
        </DialogCloseButton>
        <Button type="submit">Save location</Button>
      </div>
    </form>
  );
};
