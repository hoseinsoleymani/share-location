import { useFormContext } from 'react-hook-form';
import type { ImageListType } from 'react-images-uploading';

import { Uploader } from '../shared';
import { FormGroup } from '../shared/FormGroup/FormGroup';

export const UploadLogo = () => {
  const { setValue, watch } = useFormContext();

  const onChange = (imageList: ImageListType) => {
    setValue('logo', imageList);
  };

  return (
    <FormGroup label="Location logo:">
      <Uploader images={watch('logo')} maxNumber={69} onChange={onChange} />
    </FormGroup>
  );
};
