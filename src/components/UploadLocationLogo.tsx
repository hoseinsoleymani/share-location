import { useFormContext } from 'react-hook-form';
import type { ImageListType } from 'react-images-uploading';

import { FormGroup, Uploader } from '../ui';

export const UploadLocationLogo = () => {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const onChange = (imageList: ImageListType) => {
    setValue('logo', imageList);
    clearErrors('logo');
  };

  return (
    <FormGroup label="Location logo:">
      <Uploader images={watch('logo')} maxNumber={69} onChange={onChange} />
      {errors.logo?.message ? (
        <span className="text-red-500">please upload a image</span>
      ) : null}
    </FormGroup>
  );
};
