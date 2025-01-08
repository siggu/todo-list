'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getItem, patchItem, postImage } from '@/app/api';
import Image from 'next/image';
import { IItemDetail } from '@/app/type';
import { SetStateAction, useEffect, useState } from 'react';

export default function Page() {
  const { itemId } = useParams();

  const { data, isLoading } = useQuery<IItemDetail>({
    queryKey: [itemId],
    queryFn: getItem,
  });

  const [todo, setTodo] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setTodo(data.name);
      setMemo(data.memo);
      setIsCompleted(data.isCompleted);
      setImageUrl(data.imageUrl || '');
    }
  }, [data]);

  useEffect(() => {
    // 모든 필드가 유효한지 확인
    if (todo && memo && isCompleted && imageUrl) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [todo, memo, isCompleted, imageUrl]);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleIsCompleted = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <header>
      <div className='largeScreen'>
        <div className='flex justify-center min-h-screen'>
          <div className='bg-white w-[1200px] align-middle flex flex-col gap-4 px-[102px] pt-4'>
            {/* todo */}
            <div className='relative'>
              <Image
                src={
                  isCompleted
                    ? '/check-list-detail/large_active_rectangle.svg'
                    : '/check-list-detail/large_default_rectangle.svg'
                }
                alt='large rectangle'
                width={996}
                height={64}
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex items-center gap-4'>
                  <div onClick={handleIsCompleted}>
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
                    onChange={handleTodoChange}
                    className='text-black text-start bg-transparent focus:outline-none font-nanumSquareBold underline text-[20px] max-w-min bg-none'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between pt-4'>
              {/* 사진 추가 */}
              <div className='relative'>
                <Image
                  src={data?.imageUrl ? data?.imageUrl : '/btn/add_large_image.svg'}
                  alt='large rectangle'
                  width={384}
                  height={311}
                  style={{ objectFit: 'cover', width: '384px', height: '311px', borderRadius: '24px' }}
                />
                <label
                  htmlFor='image-upload'
                  className='cursor-pointer absolute right-[-10] bottom-[-10] transform -translate-x-1/2 -translate-y-1/2'
                >
                  <Image src={image ? '/btn/edit.svg' : '/btn/plus.svg'} width={64} height={64} alt='image-upload' />
                </label>
                <input type='file' id='image-upload' accept='image/*' style={{ display: 'none' }} />
              </div>
              <div>
                <div className='relative'>
                  {/* 메모 */}
                  <Image src={'/svgs/img/memo/large.svg'} alt='large memo' width={588} height={311} />
                  <div className='absolute inset-0 flex justify-center'>
                    <span className='text-[#92400E] font-nanumSquareBold mt-6'>Memo</span>
                  </div>
                  <div className='absolute inset-4 mt-[58px] flex flex-col overflow-auto' style={{ resize: 'none' }}>
                    <textarea
                      value={memo}
                      onChange={handleMemoChange}
                      className='w-full h-full text-black focus:outline-none resize-none text-center mb-6 custom-scroll font-nanumSquareBold'
                      style={{ background: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-4 justify-end mt-4'>
              <div>
                <Image
                  src={isActive ? '/btn/edit_large_active.svg' : '/btn/edit_large_default.svg'}
                  width={168}
                  height={56}
                  alt='edit'
                  className={isActive ? 'cursor-pointer' : ''}
                />
              </div>
              <div>
                <Image src={'/btn/delete_large_default.svg'} width={168} height={56} alt='delete' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
