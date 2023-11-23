import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';



const MyPlace = () => {
    
    // ================================= variables

    const [dataList, setDataList] = useState([])
    
    // ================================= functions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = window.sessionStorage.getItem('user');
                const userEmail = JSON.parse(session).email;
                

                const response = await axios.post('http://localhost:8080/manager/getMyPlace', null, {
                    params: {
                        email: userEmail
                    }
                });

                const content = response.data.content;

                setDataList(prevDataList => [...prevDataList, ...content.map(item => ({
                    seqHotel: item[0],
                    name: item[1],
                    addr: item[2],
                    
                   img: item[3].substr(0,item[3].indexOf(',')) === '' ? item[3] : item[3].substr(0,item[3].indexOf(','))
                }))]);
            } catch (error) {
                console.error("데이터를 가져오는 도중 에러 발생:", error);
            }
        };

        fetchData();
    }, []); 
    // ===================================================== CSS
        const {styleA} = {width: '80%', border: 'solid 1px black'}

    // ===================================================== test, API, etc.
    const printEmail = () => {
   
     console.log(dataList)

    }



    
    
    return (
        <div>
            <button onClick = {printEmail}>fkffk</button>
            <table>
                <tbody>
                    <tr>
                        <th>
                           고유번호
                        </th>
                        <th>
                            플레이스명
                        </th>
                        <th>
                            이미지
                        </th>
                        <th>
                            주소
                        </th>
                    </tr>
                    {
                        // dataList.map((item, index) => {
                        //     <tr>
                        //         <td></td>
                        //     </tr>
                        // })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyPlace;
