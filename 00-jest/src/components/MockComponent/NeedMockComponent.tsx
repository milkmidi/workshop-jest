import React from 'react';

/**
 * 這裡有用到 window
 */
const NeedMockComponent = () => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    // @ts-ignore
    setValue(window.someGlobalModel.getValue());
  }, []);
  return (
    <div>
      <span data-testid="NeedMockComponent-value">{value}</span>
    </div>
  );
};

export default NeedMockComponent;
