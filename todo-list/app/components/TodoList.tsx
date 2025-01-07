import Image from 'next/image';

interface TodoListProps {
  todoList: string[];
  onMarkAsDone: (index: number) => void;
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyImageWidth: number;
  emptyImageHeight: number;
}

export default function TodoList({
  todoList,
  onMarkAsDone,
  emptyImageSrc,
  emptyImageAlt,
  emptyImageWidth,
  emptyImageHeight,
}: TodoListProps) {
  return (
    <div>
      {todoList.length === 0 ? (
        <div className='flex flex-col items-center'>
          <Image src={emptyImageSrc} alt={emptyImageAlt} width={emptyImageWidth} height={emptyImageHeight} />
          <div className='mt-2 text-gray-300 text-center font-nanumSquareBold'>
            <p>할 일이 없어요.</p>
            <p>TODO를 새롭게 추가해주세요!</p>
          </div>
        </div>
      ) : (
        <ul>
          {todoList.map((task, index) => (
            <li key={index}>
              <span className='text-black'>{task}</span>
              <button onClick={() => onMarkAsDone(index)} className='ml-4 text-blue-500 underline'>
                완료
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
