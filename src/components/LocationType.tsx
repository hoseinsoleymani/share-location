import { useFormContext } from 'react-hook-form';

import { FormGroup } from './shared';

export const LocationType = () => {
  const { register } = useFormContext();

  return (
    <FormGroup label="Location type:">
      <select {...register('type')} name="type">
        <option value="business">Business</option>
        <option value="home">Home</option>
        <option value="work">Work</option>
      </select>
    </FormGroup>
  );
};
