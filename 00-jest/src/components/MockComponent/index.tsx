import React from 'react';
import NeedMockComponent from './NeedMockComponent';
import NeedMockComponent2 from './NeedMockComponent2';

const MockComponent = () => {
  return (
    <div data-component="MockComponent">
      <h1 className="mock-component__h1">MockComponent</h1>
      <NeedMockComponent />
      <NeedMockComponent2 />
    </div>
  );
};

export default MockComponent;
