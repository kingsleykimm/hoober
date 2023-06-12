
import RideForm from "./RideForm";
import { Space, Table, Tag } from 'antd';

import { useState, useEffect, useCallback } from "react"
function Rides() {
    const [data, setData] = useState()
    const [buttonText, setButtonText] = useState("")
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
        setButtonText("Ride Joined")
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
                <button className="Button green" onClick = {joinRide} value={buttonText} type="submit">Join Ride</button>
                )
            }
            
            
        }
    ]

    return (
        <div className="rides--page">
            <div className="rides--heading">
                <h1>Rides</h1>
                <RideForm />
            </div>
            <div className="rides">
                <Table columns={columns} dataSource={data}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                {record["DESCRIPTION"]}
                            </p>
                        )
                    }
                    }
                 />
            </div>

        </div>
    )
}
export default Rides;