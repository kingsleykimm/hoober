import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form"
import DialogDemo from "./DialogDemo";
import { Cross2Icon } from '@radix-ui/react-icons';
import RideForm from "./RideForm.jsx"
import RequestForm from "./RequestForm";
function Profile() {
    let user = JSON.parse(localStorage.getItem("curUser"))
    async function getUserRides() {
        const url = "http://localhost:4000/rides/u?" + new URLSearchParams({ user: user.username }).toString()
        console.log(url)
        const requestOptions = {
            method: "GET",
            mode: "cors",
        }
        try {
            const response = await fetch(url, requestOptions)
            const responseData = await response.json()
            console.log(responseData)
        }
        catch (error) { console.log(error) }
    }
    getUserRides()

    return (
        <div className="dashboard">
            <h1 className="profile--title">
                Dashboard
            </h1>
            <div className="profile--info">
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
                <div className="riderequests">

                        <div className="card ride">
                            <span style={{ "fontSize": "28px", "marginBottom": "10px" }}>Your Ride Offers</span>
                            <div className="rides">

                            </div>
                            <RideForm />
                        </div>


                        <div className="card request">
                            <span style={{ "fontSize": "28px", "marginBottom": "10px" }}>Your Ride Requests</span>
                            <RequestForm />
                        </div>

                </div>





            </div>

        </div>

    )
}

export default Profile;