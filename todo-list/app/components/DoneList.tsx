import Image from 'next/image';

interface DoneListProps {
  doneList: string[];
  onMarkAsTodo: (index: number) => void;
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyImageWidth: number;
  emptyImageHeight: number;
  screenSize: string;
  boxWidth: number;
  boxHeight: number;
}

export default function DoneList({
  doneList,
  onMarkAsTodo,
  emptyImageSrc,
  emptyImageAlt,
  emptyImageWidth,
  emptyImageHeight,
  screenSize,
  boxWidth,
  boxHeight,
}: DoneListProps) {
  return (
    <div>
      {doneList.length === 0 ? (
        <div className='flex flex-col items-center'>
          <Image src={emptyImageSrc} alt={emptyImageAlt} width={emptyImageWidth} height={emptyImageHeight} />
          <div className='mt-2 text-gray-300 text-center font-nanumSquareBold'>
            <p>아직 다 한 일이 없어요.</p>
            <p>해야 할 일을 체크해보세요!</p>
          </div>
        </div>
      ) : (
        <ul className='mt-4'>
          {doneList.map((task, index) => (
            <li key={index} className='mb-4'>
              <div className='relative' style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
                <Image
                  src={`/check-list/${screenSize}_active_rectangle.svg`}
                  alt='rectangle'
                  layout='fill'
                  objectFit='cover'
                />
                <div
                  className='absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => onMarkAsTodo(index)}
                >
                  <Image src={'/check-list/active_box.svg'} alt='check-box' width={32} height={32} />
                </div>
                <span className='absolute top-1/2 left-16 transform -translate-y-1/2 text-black line-through font-nanumSquareBold'>
                  {task}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
