import Image from 'next/image';

interface ImageUploadProps {
  screenSize: string;
  width: number;
  image: File | null;
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUpload({ screenSize, width, image, imageUrl, onImageChange }: ImageUploadProps) {
  return (
    <div className='relative'>
      <Image
        src={image ? URL.createObjectURL(image) : imageUrl || `/btn/add_${screenSize}_image.svg`}
        alt={`${screenSize} rectangle`}
        width={width}
        height={311}
        style={{ objectFit: 'cover', width: `${width}`, height: '311px', borderRadius: '24px' }}
      />
      <label
        htmlFor='image-upload'
        className='cursor-pointer absolute right-0 bottom-0 transform -translate-x-1/2 -translate-y-1/2'
      >
        <Image src={imageUrl ? '/btn/edit.svg' : '/btn/plus.svg'} width={64} height={64} alt='image-upload' />
      </label>
      <input type='file' id='image-upload' accept='image/*' onChange={onImageChange} style={{ display: 'none' }} />
    </div>
  );
}
