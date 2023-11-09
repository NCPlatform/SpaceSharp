import React, { useState } from 'react';
import axios from 'axios';

const ShortURL = () => {
    const [Inputurl, setInputurl] = useState('') // window.location.href
    const [resultUrl, setResultUrl] = useState('')

    const onURL = (e) => {
        const { value } = e.target
        setInputurl(value)
    }

    const urlBtn = () => {
        let id = 'z27v9n36ke' // NCP 콘솔에서 서비스 신청 후 발급
        let key = 'JxJ9Y4wLIUJuQTj1YwxwrL5Z5YqX7BA2ThQ3k8ob' // NCP 콘솔에서 서비스 신청 후 발급
        axios.post('https://naveropenapi.apigw.ntruss.com/util/v1/shorturl', null, {
            params: {
                url: Inputurl, // window.location.href
                "X-NCP-APIGW-API-KEY-ID": id,
                "X-NCP-APIGW-API-KEY": key
            }

        }).then(res => setResultUrl(res.data.result.url)).catch(error => console.log(error))
    }

    return (
        <div>
            <form>
                <h3>shortURL 테스트</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                요청할 주소: &emsp;
                                <input type='text' onChange={onURL} style={{ width: '400px' }} placeholder='이 부분은 추후 window.location.href로 변경될 예정' />
                            </td>
                        </tr>
                        <tr>
                            <td><button type='button' onClick={urlBtn}>shortURL 받아보기</button>
                                <br /><div><a href={resultUrl}>{resultUrl}</a></div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </form>
        </div>
    );
};


export default ShortURL;