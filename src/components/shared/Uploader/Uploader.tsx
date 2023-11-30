import type { ImageListType } from 'react-images-uploading';
import ImageUploading from 'react-images-uploading';

interface UploaderProps {
  onChange: (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => void;
  images: never[];
  maxNumber: number;
}

export const Uploader = ({ onChange, images, maxNumber }: UploaderProps) => {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <>
          <button
            type="button"
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>

          <button type="button" onClick={onImageRemoveAll}>
            Remove all images
          </button>

          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button type="button" onClick={() => onImageUpdate(index)}>
                  Update
                </button>
                <button type="button" onClick={() => onImageRemove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </ImageUploading>
  );
};
