import React from 'react';

// Todo App의 기본 레이아웃을 구성하는 컴포넌트
const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen overflow-y-scroll bg-slate-500">
      <div className="max-w-xl mx-auto min-w-[50rem]">
          { children }
      </div>
    </div>
  );
}

export default DefaultLayout;
