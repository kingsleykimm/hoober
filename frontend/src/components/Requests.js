
import RequestForm from './RequestForm';
import { Space, Table, ConfigProvider, theme } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { useState, useEffect, useCallback } from "react"
function Requests() {
    const [data, setData] = useState()
    const [buttonText, setButtonText] = useState("")
    const user = localStorage.getItem("curUser")
    const getRequests = useCallback(async () => {
        const requestOptions = {
            method: "GET",
            mode: "cors"
        }
        const response = await fetch("https://hoober-server.onrender.com/requests", requestOptions)
        const responseData = await response.json()

        setData(responseData.data.map((item) => {

            return {

                ...item,
                key: "" + item.id,
                DEPARTUREDATE: item.DEPARTUREDATE.slice(0, 10)
            }
        }))
    }, [])
    useEffect(() => {
        getRequests().catch(console.error)
    }, [getRequests])
    function convertToDate(dateString) {
        console.log(dateString)
        var parts = dateString.split('-');
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1; // Months are zero-based
        var day = parseInt(parts[2]);
        return new Date(year, month, day);
    }

    async function joinRequest() {
        setButtonText("Request Taken")
        const requestOptions = {
            method: "POST",
            mode: "cors",
            body: {
                user: localStorage.getItem("curUser"),

            }
        }
    }
    const columns = [
        {
            title: 'User',
            dataIndex: 'USER',
            key: 'USER',
        },
        {
            title: 'Split Gas',
            dataIndex: 'SPLITGAS',
            key: 'SPLITGAS',
            filters: [
                {
                    text: "Needs to Split Gas",
                    value: "Yes",
                },
                {
                    text: "Will Pay All Gas",
                    value: "No",
                }
            ],
            onFilter : (record, value) => record.SPLITGAS == value,
        },
        {
            title: 'Destination',
            dataIndex: 'DESTINATION',
            key: 'DESTINATION',
        },
        {
            title: 'Departure Date',
            dataIndex: 'DEPARTUREDATE',
            key: 'DEPARTUREDATE',
            sorter: (a, b) => convertToDate(a.DEPARTUREDATE) - convertToDate(b.DEPARTUREDATE),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => { //need to change text if the logged in user is this person's ride
                return (
                    user ? <button className="Button green" onClick = {joinRequest} value={buttonText} type="submit">Take Request</button> :
                <div className="Button violet">Sign Up / Log In to add Requests! </div>
                )
            }
            
            
        }
    ]
    return (

        <div className='requests--page'>
            <div className='requests--heading'>
                <h1>Requests</h1>
                {
                    user ? <RequestForm onChangeData={getRequests}/> : <div className="Button violet">Sign Up / Log In to add Requests! </div>
                }
            </div>
            <div className='requests'>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token : {
                        fontSize: '20px',
                        lineWidth: '3',
                        sizeUnit: '5'
                    }
                }}>
                <Table columns={columns} dataSource={data}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            Description: {record["DESCRIPTION"]}
                        </p>
                    ),
                    rowExpandable: (record) => record["DESCRIPTION"]
                }
                }
                pagination={{'defaultPageSize' : '6', 'defaultCurrent': '1'}}>
                </Table>
                </ConfigProvider>
            </div>
        </div>

    )
}
export default Requests;