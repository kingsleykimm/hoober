import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
function Rides() {
    return (
        <div className="rides--page">
            <div className="rides--heading">
                <h1>Rides</h1>
                <Dialog.Root className="dialogRoot">
                    <Dialog.Trigger asChild>
                        <button className="Button violet">Add Ride</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlay">
                            <Dialog.Content className="DialogContent">
                                <Dialog.Title className="DialogTitle">Add Ride</Dialog.Title>
                                <Dialog.Description className="DialogDescription">
                                    Post a Ride Offer
                                </Dialog.Description>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="passengers">
                                        Number of passengers
                                    </label>
                                    <input className="Input" id="passengers" placeholder="0" required />
                                </fieldset>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="splitgas">
                                        Split Gas?
                                    </label>
                                    <select className="Input" required id="splitgas">
                                        <option value="">Choose an option: </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>

                                </fieldset>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="destination">Destination</label>
                                    <input className="Input" id="destination" required></input>
                                </fieldset>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="date">Departure Date</label>
                                    <input className="Input" type="date" required></input>
                                </fieldset>
                                <fieldset className="Fieldset">
                                    <label className="Label" htmlFor="location">Departure Location</label>
                                    <input className="Input" required></input>
                                </fieldset>
                                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                    <Dialog.Close asChild>
                                        <button className="Button green">Post</button>
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
    )
}
export default Rides;