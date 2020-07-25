import React from 'react';
import Covid from './components/Covid';


function CList() {
  return (
    <>
    <Covid
      title="광진구 선별진료소"
      raised="100000"
      goal="200000"
    />
    <Covid
      title="서면 선별진료소"
      raised="100000"
      goal="200000"
    />
    </>
  );
}

export default CList;
