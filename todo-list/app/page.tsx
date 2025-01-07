'use client';

import { useEffect, useState } from 'react';
import InputWithButton from './components/InputWithButton';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import Image from 'next/image';

export default function Home() {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [doneList, setDoneList] = useState<string[]>([]);

  // 로컬 스토리지 키
  const TODO_LIST_KEY = 'todoList';
  const DONE_LIST_KEY = 'doneList';

  // 컴포넌트가 처음 로드될 때 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedTodos = localStorage.getItem(TODO_LIST_KEY);
    const storedDones = localStorage.getItem(DONE_LIST_KEY);

    if (storedTodos) setTodoList(JSON.parse(storedTodos));
    if (storedDones) setDoneList(JSON.parse(storedDones));
  }, []);

  // todoList나 doneList가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem(DONE_LIST_KEY, JSON.stringify(doneList));
  }, [doneList]);

  // 새로운 todo 추가 함수
  const handleAddTodo = (newTodo: string) => {
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  // 완료 버튼 클릭 시 처리
  const handleMarkAsDone = (index: number) => {
    const item = todoList[index];
    setTodoList((prevList) => prevList.filter((_, i) => i !== index));
    setDoneList((prevList) => [...prevList, item]);
  };

  // todo 전환 함수
  const handleMarkAsTodo = (index: number) => {
    const item = doneList[index];
    setDoneList((prevList) => prevList.filter((_, i) => i !== index));
    setTodoList((prevList) => [...prevList, item]);
  };

  const addSmallButtonSrc =
    todoList.length === 0
      ? '/btn/add_small_active.svg' // Todo가 없을 때 이미지
      : '/btn/add_small_default.svg'; // Todo가 있을 때 이미지

  const addMediumLargeButtonSrc = todoList.length === 0 ? '/btn/add_large_active.svg' : '/btn/add_large_default.svg';

  return (
    <header>
      {/* Small Screen */}
      <div className='smallScreen'>
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
      <div className='mediumScreen'>
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
