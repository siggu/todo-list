'use client';

import InputWithButton from './components/Header/InputWithButton';

export default function Home() {
  return (
    <header>
      {/* Small Screen */}
      <div className='smallScreen'>
        <InputWithButton
          inputSrc={'/svgs/img/search_small.svg'}
          inputWidth={270}
          buttonSrc={'/btn/add_small_default.svg'}
          buttonWidth={56}
          prValue='pr-[50px]'
        />
      </div>
      {/* Medium Screen */}
      <div className='mediumScreen'>
        <InputWithButton
          inputSrc={'/svgs/img/search_medium.svg'}
          inputWidth={518}
          buttonSrc={'/btn/add_large_default.svg'}
          buttonWidth={162}
          prValue='pr-[300px]'
        />
      </div>
      {/* Large Screen */}
      <div className='largeScreen'>
        <InputWithButton
          inputSrc={'/svgs/img/search_large.svg'}
          inputWidth={1016}
          buttonSrc={'/btn/add_large_default.svg'}
          buttonWidth={168}
          prValue='pr-[780px]'
        />
      </div>
    </header>
  );
}
