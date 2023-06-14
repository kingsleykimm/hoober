import * as Dialog from "@radix-ui/react-dialog";
import { useState, useCallback, useEffect } from "react"
import DialogDemo from "./DialogDemo";
import { Cross2Icon } from '@radix-ui/react-icons';
import RideForm from "./RideForm.jsx"
import RequestForm from "./RequestForm";
import Passengers from "./Passengers";
function Profile() {
    const [rideData, setRideData] = useState()
    const [requestData, setRequestData] = useState()
    const [randomVal, resetter] = useState()
    let user = JSON.parse(localStorage.getItem("curUser"))
    const getUserRides = useCallback(async () => {
        const url = "http://localhost:4000/rides/u?" + new URLSearchParams({ user: user.username }).toString()

        const requestOptions = {
            method: "GET",
            mode: "cors",
        }

        const response = await fetch(url, requestOptions)
        const responseData = await response.json()

        setRideData(responseData.data)

    }, [])
    const getUserRequests = useCallback(async () => {
        const url = "http://localhost:4000/requests/u?" + new URLSearchParams({ user: user.username }).toString()

        const requestOptions = {
            method: "GET",
            mode: "cors",
        }

        const response = await fetch(url, requestOptions)
        const responseData = await response.json()

        setRequestData(responseData.data)

    }, [])

    useEffect(() => {
        getUserRides().catch(console.error)
    }, [getUserRides])
    useEffect(() => {
        getUserRequests().catch(console.error)
    }, [getUserRequests])

    const deleteRide = async (event, ind) => {
        const requestOptions = {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({index: ind})
        }
        const response = await fetch("http://localhost:4000/rides/u", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        getUserRides()
    }
    const deleteRequest = async(event, ind) => {
        const requestOptions = {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({index: ind})
        }
        const response = await fetch("http://localhost:4000/requests/u", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        getUserRequests()
    }
    console.log(rideData)
    return (
        <div className="dashboard">
            {/* <h1 className="profile--title">
                Dashboard
            </h1> */}
            <div className="profile--info">
                <div className="user--card">
                <div className="card">
                    <div className="card-border-top"></div>
                    <div className="img">
                        <img src="/default_profile.png"></img>
                    </div>

                    <span style={{ "fontSize": "24px" }}><em>{user["username"]}</em> </span>
                    <span>Email: {user["email"] ? user["email"] : "N/A"}</span>
                    <span>Phone Number : {user["phoneNumber"] ? user["phoneNumber"] : "N/A"}</span>
                    <div className="profile--buttons">
                        <DialogDemo />
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="Button violet">Add Email</button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="DialogOverlay">
                                    <Dialog.Content className="DialogContent">
                                        <Dialog.Title className="DialogTitle">Add Email</Dialog.Title>
                                        <Dialog.Description className="DialogDescription">
                                            Add an Email to your account.
                                        </Dialog.Description>
                                        <fieldset className="Fieldset">
                                            <label className="Label" htmlFor="name">
                                                Email
                                            </label>
                                            <input className="Input" id="name" placeholder="email" type="email" required />
                                        </fieldset>
                                        <fieldset className="Fieldset">
                                            <label className="Label" htmlFor="username">
                                                Confirm Email
                                            </label>
                                            <input className="Input" id="username" placeholder="confirm email" type="email" required />
                                        </fieldset>
                                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                            <Dialog.Close asChild>
                                                <button className="Button green">Save changes</button>
                                            </Dialog.Close>
                                        </div>


                                        <Dialog.Close asChild>
                                            <button className="IconButton" aria-label="Close">
                                                <Cross2Icon />
                                            </button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Overlay>
                            </Dialog.Portal>
                        </Dialog.Root>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button className="Button violet">Add Number</button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="DialogOverlay">
                                    <Dialog.Content className="DialogContent">
                                        <Dialog.Title className="DialogTitle">Add Number</Dialog.Title>
                                        <Dialog.Description className="DialogDescription">
                                            Add a phone number to your account.
                                        </Dialog.Description>
                                        <fieldset className="Fieldset">
                                            <label className="Label" htmlFor="name">
                                                Email
                                            </label>
                                            <input className="Input" id="name" placeholder="000-000-0000" type="text" required />
                                        </fieldset>
                                        <fieldset className="Fieldset">
                                            <label className="Label" htmlFor="username">
                                                Confirm Email
                                            </label>
                                            <input className="Input" id="username" placeholder="000-000-0000" type="text" required />
                                        </fieldset>
                                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                            <Dialog.Close asChild>
                                                <button className="Button green">Save changes</button>
                                            </Dialog.Close>
                                        </div>


                                        <Dialog.Close asChild>
                                            <button className="IconButton" aria-label="Close">
                                                <Cross2Icon />
                                            </button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Overlay>
                            </Dialog.Portal>
                        </Dialog.Root>


                    </div>
                </div>
                <div className="notifications--card">

                </div>
                </div>

                <div className="ride--card">
                    <div className="ride header">
                        <span style={{ "fontSize": "28px", "marginBottom": "10px" }}>My Ride Offers</span>
                        <RideForm onChangeData = {getUserRides}/>
                    </div>
                    {
                        rideData && rideData.map((item, i) => {
                            return <div className="ride--item" key={i}>
                                <div className="ride--info">
                                    <p>Ride to {item.DESTINATION}, {item.DEPARTUREDATE.slice(0, 10)}</p>
                                    <Passengers ride={item} />
                                </div>

                                <div className="ride--buttons">
                                    <RideForm isEdit={true} ride={item} index = {i} onChangeData={getUserRides} />

                                    <button className="Button red" onClick = {(event) => deleteRide(event, item.id)} style={{
                                        "marginLeft": "10px",
                                        "position": "relative", "right": "10px"
                                    }}>Delete</button>
                                </div>

                            </div>
                        })
                    }
                </div>


                <div className="request--card">
                    <div className="request header">
                        <span style={{ "fontSize": "28px", "marginBottom": "10px" }}>My Ride Requests</span>
                        <RequestForm onChangeData = {getUserRequests} />
                    </div>
                    {
                        requestData && requestData.map((item, i) => {
                            return <div className="request--item" key={i}>
                                <p className="request--info">Request to {item.DESTINATION}, {item.DEPARTUREDATE.slice(0, 10)}</p>
                                <div className="request--buttons">
                                    <RequestForm isEdit={true} request={item} index={i} onChangeData={getUserRequests}/>
                                    <button className="Button red" onClick = {(event) => deleteRequest(event, item.id)} style={{
                                        "marginLeft": "10px",
                                        "position": "relative", "right": "10px"
                                    }}>Delete</button>
                                </div>
                            </div>
                        })
                    }

                </div>







            </div>

        </div>

    )
}

export default Profile;