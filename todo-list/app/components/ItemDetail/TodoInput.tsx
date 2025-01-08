import Image from 'next/image';

export default function TodoInput({
  screenSize,
  width,
  isCompleted,
  todo,
  onToggleCompleted,
  onTodoChange,
}: {
  screenSize: string;
  width: number;
  isCompleted: boolean;
  todo: string;
  onToggleCompleted: () => void;
  onTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='relative'>
      <Image
        src={
          isCompleted
            ? `/check-list-detail/${screenSize}_active_rectangle.svg`
            : `/check-list-detail/${screenSize}_default_rectangle.svg`
        }
        alt='large rectangle'
        width={width}
        height={64}
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex items-center gap-6'>
          <div onClick={onToggleCompleted}>
            <Image
              src={isCompleted ? '/check-list/active_box.svg' : '/check-list/default_box.svg'}
              alt='check-box'
              width={32}
              height={32}
            />
          </div>
          <input
            type='text'
            value={todo}
            size={todo.length * 1.5 || 1}
            onChange={onTodoChange}
            className='text-black text-start bg-transparent focus:outline-none font-nanumSquareBold underline text-[20px] max-w-min bg-none'
          />
        </div>
      </div>
    </div>
  );
}
