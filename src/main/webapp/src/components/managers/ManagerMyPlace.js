import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';



const MyPlace = () => {
    
    const [email, setEmail] = useState('')
    const [res, setRes] = useState()
    const [dataList, setDataList] = useState([])

    
    useEffect(() => {
        const fetchData = async () => {
            const session = window.sessionStorage.getItem("user");
            const userEmail = JSON.parse(session).email;
            setEmail(userEmail);
            const response = await axios.post('http://localhost:8080/manager/getMyPlace', null, {
                params: {
                    email: userEmail
                }
            }).then(res => {
                setRes(res);
                console.log('res.data : ' + res.data)
                console.log('res.data.content : ' + res.data.content)
                console.log(res.data.content[1][1])

            }).catch(e => console.log(e))
            
            console.log('response.data = ' + response)
        };

        fetchData();
    }, []);

    const printEmail = () => {
        console.log(email)
        console.log(res)

        console.log(res.data.content[1])    
        console.log('length  : '+res.data.content.length)

        const list = []
        const length = res.data.content.length
        for(let i = 0; i<length; i++){
            list[i] = res.data.content[i]
            setDataList({...dataList, i:res.data.content[i]})
        }
        console.log(list)
        list.map((item) => {
            console.log(item)
        })
       // setDataList(list)
        console.log(dataList)
    }



    
    
    return (
        <div>
            <button onClick = {printEmail}>fkffk</button>
        </div>
    );
};

export default MyPlace;
