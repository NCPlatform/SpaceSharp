import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  const handleComplete = (data) => {
    props.onAddData(data);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    // Extract the postal code
    const postalCode = data.zonecode;

    // Pass both fullAddress and postalCode to the parent component
    props.onAddData({ fullAddress, postalCode });
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '650px',
    height: '1250px',
    padding: '7px',
    border: '2px solid #666',
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />

    </div>
  );
};

export default PopupPostCode;
