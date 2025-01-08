import Image from 'next/image';

interface EditDeleteButtonProps {
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EditDeleteButton({ isActive, onEdit, onDelete }: EditDeleteButtonProps) {
  return (
    <div className='flex gap-4 justify-end mt-6'>
      <div>
        <Image
          src={isActive ? '/btn/edit_large_active.svg' : '/btn/edit_large_default.svg'}
          width={168}
          height={56}
          alt='edit'
          onClick={isActive ? onEdit : undefined}
          className={isActive ? 'cursor-pointer' : ''}
        />
      </div>
      <div>
        <Image
          src={'/btn/delete_large_default.svg'}
          width={168}
          height={56}
          onClick={onDelete}
          alt='delete'
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
