'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getItem, patchItem, postImage } from '@/app/api';
import { IItemDetail } from '@/app/type';
import { useEffect, useState } from 'react';
import { deleteItem } from './../../api';
import TodoInput from '@/app/components/ItemDetail/TodoInput';
import ImageUpload from '@/app/components/ItemDetail/ImageUpload';
import MemoInput from '@/app/components/ItemDetail/MemoInput';
import EditDeleteButton from '@/app/components/ItemDetail/EditButton';

export default function Page() {
  const { itemId } = useParams();
  const router = useRouter();

  const { data } = useQuery<IItemDetail>({
    queryKey: [itemId],
    queryFn: getItem,
  });

  const [todo, setTodo] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  // 이미지 post mutation
  const { mutate: imageUpload } = useMutation({
    mutationFn: (formData: FormData) => postImage(formData),
    onSuccess: (response: { url: string }) => {
      const uploadedImageUrl = response?.url;
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl); // 성공적으로 받은 imageUrl 업데이트
      } else {
        console.error('URL을 받을 수 없습니다.');
      }
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  // 아이템 patch mutation
  const { mutate: updateItem } = useMutation({
    mutationFn: ({
      name,
      memo,
      imageUrl,
      isCompleted,
      itemId,
    }: {
      name: string;
      memo: string;
      imageUrl: string;
      isCompleted: boolean;
      itemId: number;
    }) => patchItem(name, memo, imageUrl, isCompleted, itemId),
    onSuccess: (data) => {
      console.log('아이템 업데이트 성공:', data);
      router.push('/');
    },
    onError: (error) => {
      console.error('아이템 업데이트 실패:', error);
      console.log(todo, memo, imageUrl, isCompleted, itemId);
    },
  });

  // 아이템 delete mutation
  const { mutate: itemDelete } = useMutation({
    mutationFn: (itemId: number) => deleteItem(itemId),
    onSuccess: () => {
      router.push('/');
    },
  });

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

  // 핸들러
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleIsCompleted = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 파일 이름 체크
      const fileName = file.name;
      const fileNameRegex = /^[a-zA-Z-_\.]+$/;
      if (!fileNameRegex.test(fileName)) {
        alert('파일 이름은 영어로만 구성되어야 합니다.');
        return;
      }

      // 파일 크기 체크
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 5) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // FormData 생성
      const formData = new FormData();
      formData.append('image', file); // 'image'는 API 스펙에 맞춰야 함

      setImage(file); // 선택한 이미지 상태 업데이트
      imageUpload(formData); // Mutation 호출
    }
  };

  const handleAllChange = () => {
    updateItem({
      name: todo,
      memo: memo,
      imageUrl: imageUrl,
      isCompleted: isCompleted,
      itemId: Number(itemId),
    });
  };

  const handleDeleteItem = () => {
    itemDelete(itemId);
  };

  return (
    <header>
      {/* Small Screen */}
      <div className='smallScreen'>
        <div className='flex justify-center min-h-screen'>
          <div className='bg-white w-[385px] align-middle flex flex-col px-4 pt-4'>
            {/* todo */}
            <TodoInput
              screenSize={'small'}
              width={343}
              isCompleted={isCompleted}
              todo={todo}
              onToggleCompleted={handleIsCompleted}
              onTodoChange={handleTodoChange}
            />
            <div className='flex flex-col items-center pt-6 gap-4'>
              {/* 사진 업로드 */}
              <ImageUpload
                screenSize={'small'}
                width={343}
                image={image}
                imageUrl={imageUrl}
                onImageChange={handleImageChange}
              />
              <div>
                <div className='relative'>
                  {/* 메모 */}
                  <MemoInput screenSize={'small'} width={343} memo={memo} onMemoChange={handleMemoChange} />
                </div>
              </div>
            </div>
            <div>
              {/* 수정, 삭제 버튼 */}
              <EditDeleteButton isActive={isActive} onEdit={handleAllChange} onDelete={handleDeleteItem} />
            </div>
          </div>
        </div>
      </div>
      {/* Medium Screen */}
      <div className='mediumScreen'>
        <div className='flex justify-center min-h-screen'>
          <div className='bg-white w-[744px] align-middle flex flex-col px-6 pt-4'>
            {/* todo */}
            <TodoInput
              screenSize={'medium'}
              width={696}
              isCompleted={isCompleted}
              todo={todo}
              onToggleCompleted={handleIsCompleted}
              onTodoChange={handleTodoChange}
            />
            <div className='flex flex-col items-center pt-6 gap-6'>
              {/* 사진 업로드 */}
              <ImageUpload
                screenSize={'medium'}
                width={696}
                image={image}
                imageUrl={imageUrl}
                onImageChange={handleImageChange}
              />
              {/* 메모 */}
              <MemoInput screenSize={'medium'} width={696} memo={memo} onMemoChange={handleMemoChange} />
            </div>
            <div>
              {/* 수정, 삭제 버튼 */}
              <EditDeleteButton isActive={isActive} onEdit={handleAllChange} onDelete={handleDeleteItem} />
            </div>
          </div>
        </div>
      </div>
      {/* Large Screen */}
      <div className='largeScreen'>
        <div className='flex justify-center min-h-screen'>
          <div className='bg-white w-[1200px] align-middle flex flex-col px-[102px] pt-6'>
            {/* todo */}
            <TodoInput
              screenSize={'large'}
              width={996}
              isCompleted={isCompleted}
              todo={todo}
              onToggleCompleted={handleIsCompleted}
              onTodoChange={handleTodoChange}
            />
            <div className='flex justify-between pt-6'>
              {/* 사진 업로드 */}
              <ImageUpload
                screenSize={'large'}
                width={384}
                image={image}
                imageUrl={imageUrl}
                onImageChange={handleImageChange}
              />
              <div>
                <div className='relative'>
                  {/* 메모 */}
                  <MemoInput screenSize={'large'} width={588} memo={memo} onMemoChange={handleMemoChange} />
                </div>
              </div>
            </div>
            <div>
              {/* 수정, 삭제 버튼 */}
              <EditDeleteButton isActive={isActive} onEdit={handleAllChange} onDelete={handleDeleteItem} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
