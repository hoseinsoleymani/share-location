import { Uploader } from '../shared';
import { ImageListType } from 'react-images-uploading';
import { useFormContext } from 'react-hook-form';
import { FormGroup } from 'components/shared/FormGroup/FormGroup';

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
