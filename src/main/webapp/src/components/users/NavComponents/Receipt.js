import { forwardRef } from 'react';

const Receipt = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="receipt">
      영수증이어요
    </div>
  );
});

export default Receipt;
