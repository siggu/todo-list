import Image from 'next/image';

export default function MemoInput({
  screenSize,
  width,
  memo,
  onMemoChange,
}: {
  screenSize: string;
  width: number;
  memo: string;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className='relative'>
      <Image
        src={`/svgs/img/memo/${screenSize}.svg`}
        alt={`${screenSize} memo`}
        width={width}
        height={311}
        style={{ borderRadius: '24px' }}
      />
      <div className='absolute inset-0 flex justify-center'>
        <span className='text-[#92400E] font-nanumSquareBold mt-6'>Memo</span>
      </div>
      <div className='absolute inset-4 mt-[58px] flex flex-col overflow-auto' style={{ resize: 'none' }}>
        <textarea
          value={memo || ''}
          onChange={onMemoChange}
          className='w-full h-full text-black focus:outline-none resize-none text-center mb-6 custom-scroll font-nanumSquareBold'
          style={{ background: 'none' }}
        />
      </div>
    </div>
  );
}
