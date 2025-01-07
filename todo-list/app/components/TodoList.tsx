import Image from 'next/image';
import Link from 'next/link';
import { TodoListProps } from '../type';

export default function TodoList({
  todoList,
  onMarkAsDone,
  emptyImageSrc,
  emptyImageAlt,
  emptyImageWidth,
  emptyImageHeight,
  screenSize,
  boxWidth,
  boxHeight,
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
        <ul className='mt-4'>
          {todoList.map((item, index) => (
            <li key={index} className='mb-4'>
              <div className='relative' style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
                <Link href={`/items/${index}`}>
                  <Image
                    src={`/check-list/${screenSize}_default_rectangle.svg`}
                    alt='rectangle'
                    layout='fill'
                    objectFit='cover'
                  />
                </Link>
                <div
                  className='absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => onMarkAsDone(index)}
                >
                  <Image src={'/check-list/default_box.svg'} alt='check-box' width={32} height={32} />
                </div>
                <span className='absolute top-1/2 left-16 transform -translate-y-1/2 text-black font-nanumSquareBold'>
                  {item.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
