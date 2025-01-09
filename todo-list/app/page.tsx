'use client';

import InputWithButton from './components/InputWithButton';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getItems, patchItemIsCompleted } from './api';
import { IItemData } from './type';

export default function Home() {
  const { data } = useQuery<IItemData[]>({
    queryKey: ['items'],
    queryFn: getItems,
  });

  const mutation = useMutation({
    mutationFn: (itemId: number) => {
      const item = data?.find((item) => item.id === itemId);
      if (item) {
        return patchItemIsCompleted(!item.isCompleted, itemId);
      }
      return Promise.reject('item 없음');
    },
  });

  // 완료 버튼 클릭 시 처리
  const handleMarkAsDone = (itemId: number) => {
    mutation.mutate(itemId);
  };

  // todo 전환 함수
  const handleMarkAsTodo = (itemId: number) => {
    mutation.mutate(itemId);
  };

  // todo와 done 데이터 필터링
  const todos = data?.filter((item) => !item.isCompleted) || [];
  const dones = data?.filter((item) => item.isCompleted) || [];

  const addSmallButtonSrc =
    todos.length === 0
      ? '/btn/add_small_active.svg' // Todo가 없을 때 이미지
      : '/btn/add_small_default.svg'; // Todo가 있을 때 이미지

  const addMediumLargeButtonSrc = todos.length === 0 ? '/btn/add_large_active.svg' : '/btn/add_large_default.svg';

  return (
    <header>
      {/* Small Screen */}
      <div className='smallScreen px-4'>
        <InputWithButton
          inputSrc={'/svgs/img/search_small.svg'}
          inputWidth={270}
          buttonSrc={addSmallButtonSrc}
          buttonWidth={56}
          prValue='pr-[50px]'
        />
        <div className='mt-4'>
          <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
        </div>
        <div>
          <TodoList
            todoList={todos}
            onMarkAsDone={handleMarkAsDone}
            emptyImageSrc='/svgs/img/empty/todo_small.svg'
            emptyImageAlt='No tasks'
            emptyImageWidth={120}
            emptyImageHeight={120}
            screenSize='small'
            boxWidth={344}
            boxHeight={50}
          />
        </div>
        <div className='mt-12'>
          <Image src={'/svgs/img/done.svg'} alt='done' width={100} height={36} />
        </div>
        <DoneList
          doneList={dones}
          onMarkAsTodo={handleMarkAsTodo}
          emptyImageSrc='/svgs/img/empty/done_small.svg'
          emptyImageAlt='No completed tasks'
          emptyImageWidth={120}
          emptyImageHeight={120}
          screenSize='small'
          boxWidth={344}
          boxHeight={50}
        />
      </div>
      {/* Medium Screen */}
      <div className='mediumScreen px-6'>
        <InputWithButton
          inputSrc={'/svgs/img/search_medium.svg'}
          inputWidth={518}
          buttonSrc={addMediumLargeButtonSrc}
          buttonWidth={162}
          prValue='pr-[300px]'
        />
        <div className='mt-10'>
          <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
        </div>
        <div>
          <TodoList
            todoList={todos}
            onMarkAsDone={handleMarkAsDone}
            emptyImageSrc='/svgs/img/empty/todo_small.svg'
            emptyImageAlt='No tasks'
            emptyImageWidth={240}
            emptyImageHeight={240}
            screenSize='medium'
            boxWidth={696}
            boxHeight={50}
          />
        </div>
        <div className='mt-12'>
          <Image src={'/svgs/img/done.svg'} alt='done' width={100} height={36} />
        </div>
        <DoneList
          doneList={dones}
          onMarkAsTodo={handleMarkAsTodo}
          emptyImageSrc='/svgs/img/empty/done_small.svg'
          emptyImageAlt='No completed tasks'
          emptyImageWidth={240}
          emptyImageHeight={240}
          screenSize='medium'
          boxWidth={696}
          boxHeight={50}
        />
      </div>
      {/* Large Screen */}
      <div className='largeScreen'>
        <InputWithButton
          inputSrc={'/svgs/img/search_large.svg'}
          inputWidth={1016}
          buttonSrc={addMediumLargeButtonSrc}
          buttonWidth={168}
          prValue='pr-[780px]'
        />
        <div className='flex justify-between mt-10'>
          {/* Todo Section */}
          <div className='flex flex-col items-start'>
            <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
            <div className='mt-6 w-[588px]'>
              <TodoList
                todoList={todos}
                onMarkAsDone={handleMarkAsDone}
                emptyImageSrc='/svgs/img/empty/todo_small.svg'
                emptyImageAlt='No tasks'
                emptyImageWidth={240}
                emptyImageHeight={240}
                screenSize='large'
                boxWidth={588}
                boxHeight={50}
              />
            </div>
          </div>

          {/* Done Section */}
          <div className='flex flex-col items-start'>
            <Image src={'/svgs/img/done.svg'} alt='done' width={100} height={36} />
            <div className='mt-6 w-[588px]'>
              <DoneList
                doneList={dones}
                onMarkAsTodo={handleMarkAsTodo}
                emptyImageSrc='/svgs/img/empty/done_small.svg'
                emptyImageAlt='No completed tasks'
                emptyImageWidth={240}
                emptyImageHeight={240}
                screenSize='large'
                boxWidth={588}
                boxHeight={50}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
