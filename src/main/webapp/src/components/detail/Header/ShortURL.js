import React, { useState } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import image from '../../../img/linkIcon.png' 
import axios from 'axios'

const ShortURL = () => {
    const [resultUrl, setResultUrl] = useState('')

    const shareShort = () => {
        let id = 'z27v9n36ke' // NCP 콘솔에서 서비스 신청 후 발급
        let key = 'JxJ9Y4wLIUJuQTj1YwxwrL5Z5YqX7BA2ThQ3k8ob' // NCP 콘솔에서 서비스 신청 후 발급
        axios.post('https://naveropenapi.apigw.ntruss.com/util/v1/shorturl', null, {
            params: {
                url: "https://www.naver.com",
                //shortURL의 경우 localhost:3000에서는 동작하지 않습니다. 배포 후 window.location.href로 바꿔 주세요
                // 저 URL은 저희 미니프로젝트 링크입니다! 컴포넌트 추가 후 정상 접속되는지 테스트 부탁드립니다
                "X-NCP-APIGW-API-KEY-ID": id,
                "X-NCP-APIGW-API-KEY": key
            }

        }).then(res => setResultUrl(res.data.result.url)).catch(error => console.log(error))
    }

    return (
        <div>
            <CopyToClipboard text={resultUrl}
                onCopy={() => alert("클립보드에 URL이 복사되었습니다.")}>
                <img src={image} onLoad={shareShort} style={{ cursor: 'pointer' }} /></CopyToClipboard>
        </div>
    );
};


export default ShortURL;