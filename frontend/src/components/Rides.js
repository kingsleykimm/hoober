
import RideForm from "./RideForm";
import { Space, Table, ConfigProvider, theme} from 'antd';
import { Fade } from "react-awesome-reveal";
import { useState, useEffect, useCallback } from "react"
function Rides() {
    const [data, setData] = useState()

    const [isClicked, setIsClicked] = useState(false)
    const user = localStorage.getItem("curUser")

    const getRides = useCallback(async () => {
        const requestOptions = {
            method: "GET",
            mode: "cors"
        }
        const response = await fetch("http://localhost:4000/rides", requestOptions)
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
        getRides().catch(console.error)
    }, [getRides])

    function convertToDate(dateString) {
        console.log(dateString)
        var parts = dateString.split('-');
        var year = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1; // Months are zero-based
        var day = parseInt(parts[2]);
        return new Date(year, month, day);
      }
      
      async function joinRide () {
        setIsClicked(true)
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
            title: 'Driver',
            dataIndex: 'USER',
            key: 'USER',
        },
        {
            title: 'Passengers',
            dataIndex: 'RIDERS',
            key: 'RIDERS',
            sorter: (a, b) => a.RIDERS - b.RIDERS
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
            title: 'Departure Location',
            dataIndex: 'DEPARTURELOCATION',
            key: 'DEPARTURELOCATION',
            render: (text, record) => <div>
                <p>{record.DEPARTURELOCATION}</p>

            </div>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => { //need to change text if the logged in user is this person's ride
                return (
                    user ? <button className="Button green" onClick = {joinRide}>{isClicked ? 'Joined!' : 'Join Ride'}</button> :
                    <div className="Button violet">Sign Up / Log In to join rides! </div>
                )
            }
            
            
        }
    ]

    return (

        <div className="rides--page">
            <div className="rides--heading">
                <h1>Rides</h1>
                {
                    user ? <RideForm onChangeData={getRides}/> : <div className="Button violet">Sign Up / Log In to add rides! </div>
                }
            </div>
            <div className="rides">
                <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token : {
                        fontSize: '22px',
                        lineWidth: '3',
                        sizeUnit: '8'
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
                    pagination={{'defaultPageSize' : '6', 'defaultCurrent': '1'}}
                    
                 />
                 </ConfigProvider>
            </div>

        </div>

    )
}
export default Rides;