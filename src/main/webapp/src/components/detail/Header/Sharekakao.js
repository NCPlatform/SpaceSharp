import React, { useState } from 'react';

const Sharekakao = () => {
    const { Kakao } = window;

    const [spaceName, setSpaceName] = useState('') // 장소의 이름
    const [imageLink1, setImageLink1] = useState('') // 미리보기 첫 번째 이미지 링크
    const [imageLink2, setImageLink2] = useState('') // 미리보기 두 번째 이미지 링크
    const [imageLink3, setImageLink3] = useState('') // 미리보기 세 번째 이미지 링크
    const [path, setPath] = useState('') // 장소 상세페이지 링크. localhost:3000/ 뒤 값
    const share = () => {


        Kakao.Share.createCustomButton({
            container: '#kakaotalk-sharing-btn',
            templateId: 100366,
            templateArgs: {
                title: '제목 영역입니다.',
                description: '설명 영역입니다.',
                Image1: imageLink1,
                Image2: imageLink2,
                Image3: imageLink3,
                path: path,
                title: spaceName


            }
        })


    }

    return (
        <div>
            <a id="kakaotalk-sharing-btn" href="javascript:;" onClick={share}>
                <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                    alt="카카오톡 공유 보내기 버튼" />
            </a>

        </div>
    );
};

export default Sharekakao;