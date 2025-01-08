'use client';

import { useEffect, useState } from 'react';
import InputWithButton from './components/InputWithButton';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getItems, patchItemIsCompleted } from './api';
import { IItemData } from './type';

export default function Home() {
  const [todoList, setTodoList] = useState<IItemData[]>([]);
  const [doneList, setDoneList] = useState<IItemData[]>([]);

  const { data } = useQuery<IItemData[]>({
    queryKey: ['items'],
    queryFn: getItems,
  });

  useEffect(() => {
    if (data) {
      const todos = data.filter((item: { isCompleted: boolean }) => !item.isCompleted); // isCompleted가 false인 항목을 todoList에 추가
      const dones = data.filter((item: { isCompleted: boolean }) => item.isCompleted); // isCompleted가 true인 항목을 doneList에 추가

      setTodoList(todos);
      setDoneList(dones);
    }
  }, [data]);

  // todo <-> done 변경 mutation
  const mutation = useMutation({
    mutationFn: (itemId: number) => {
      // id를 기준으로 item 찾기
      const item = todoList.find((item) => item.id === itemId) || doneList.find((item) => item.id === itemId);
      if (item) {
        return patchItemIsCompleted(!item.isCompleted, itemId);
      }
      return Promise.reject('item 없음');
    },
    onSuccess: (updatedItem: IItemData) => {
      // mutation 성공 시 최신 상태를 기반으로 list 업데이트
      setTodoList((prevList) =>
        updatedItem.isCompleted ? prevList.filter((item) => item.id !== updatedItem.id) : [...prevList, updatedItem]
      );
      setDoneList((prevList) =>
        updatedItem.isCompleted ? [...prevList, updatedItem] : prevList.filter((item) => item.id !== updatedItem.id)
      );
    },
  });

  // 새로운 todo 추가 함수
  const handleAddTodo = (newTodo: string) => {
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  // 완료 버튼 클릭 시 처리
  const handleMarkAsDone = (index: number) => {
    const item = todoList[index];
    mutation.mutate(item.id);
  };

  // todo 전환 함수
  const handleMarkAsTodo = (index: number) => {
    const item = doneList[index];
    mutation.mutate(item.id);
  };

  const addSmallButtonSrc =
    todoList.length === 0
      ? '/btn/add_small_active.svg' // Todo가 없을 때 이미지
      : '/btn/add_small_default.svg'; // Todo가 있을 때 이미지

  const addMediumLargeButtonSrc = todoList.length === 0 ? '/btn/add_large_active.svg' : '/btn/add_large_default.svg';

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
          onAddTodo={handleAddTodo}
        />
        <div className='mt-4'>
          <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
        </div>
        <div>
          <TodoList
            todoList={todoList}
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
          doneList={doneList}
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
          onAddTodo={handleAddTodo}
        />
        <div className='mt-10'>
          <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
        </div>
        <div>
          <TodoList
            todoList={todoList}
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
          doneList={doneList}
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
          onAddTodo={handleAddTodo}
        />
        <div className='flex justify-between mt-10'>
          {/* Todo Section */}
          <div className='flex flex-col items-start'>
            <Image src={'/svgs/img/todo.svg'} alt='todo' width={100} height={36} />
            <div className='mt-6 w-[588px]'>
              <TodoList
                todoList={todoList}
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
                doneList={doneList}
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
