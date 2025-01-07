import Image from 'next/image';

interface DoneListProps {
  doneList: string[];
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyImageWidth: number;
  emptyImageHeight: number;
}

export default function DoneList({
  doneList,
  emptyImageSrc,
  emptyImageAlt,
  emptyImageWidth,
  emptyImageHeight,
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
        <ul>
          {doneList.map((task, index) => (
            <li className='text-black' key={index}>
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
