import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { IInputWithButton } from '../type';
import { useMutation } from '@tanstack/react-query';
import { postTodo } from '../api';

export default function InputWithButton({ inputSrc, inputWidth, buttonSrc, buttonWidth, prValue }: IInputWithButton) {
  const [inputValue, setInputValue] = useState('');
  const mutation = useMutation({
    mutationFn: (name: string) => postTodo(name),
    onSuccess: () => {
      setInputValue(''); // 입력 필드 초기화
    },
    onError: (error) => {
      console.error('Todo 추가 실패:', error); // 오류 처리
    },
  });

  // 입력 감지
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (!inputValue.trim()) return; // 빈 입력 방지
    mutation.mutate(inputValue);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick(); // "엔터" 키 입력 시 버튼 클릭 이벤트 호출
    }
  };

  return (
    <div className='flex mt-6 relative justify-between'>
      <Image src={inputSrc} alt='search field' width={inputWidth} height={56} className='mr-4' />
      {/* 입력 필드 */}
      <div className='absolute left-6 top-3.5'>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handlePressEnter}
          placeholder='할 일을 입력해주세요'
          className={`z-1 bg-transparent text-black text-start focus:outline-none font-nanumSquareBold ${prValue}`}
        />
      </div>
      {/* 등록 버튼 */}
      <div onClick={handleButtonClick} className='cursor-pointer'>
        <Image src={buttonSrc} alt='Add Button' width={buttonWidth} height={56} />
      </div>
    </div>
  );
}
