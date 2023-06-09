import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form"
import { Cross2Icon } from '@radix-ui/react-icons';
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import {useState} from "react"
function RideForm() {
    const formSchema = Yup.object().shape({
        passengers: Yup.number()
        .required('Number of passengers is required'),
        splitgas: Yup.string()
        .required("Please select an option"),
        destination: Yup.string()
        .required("Please provide a destination"),
        departureDate : Yup.date()
        .required("Please provide a Departure Date"),
        departureLocation : Yup.string()
        .required("Please provide a departure Location"),
        description: Yup.string()
    })
    const formOptions = {resolver: yupResolver(formSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions);
    const {errors} = formState
    const [open, setOpen] = useState(false)
    const onSubmit = async (data) => {
        setOpen(false)

        const requestOptions = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                user: JSON.parse(localStorage.getItem("curUser"))} 
            )
        }
        
        console.log(requestOptions.body)
        const response = await fetch("http://localhost:4000/rides/", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        reset()
    }
    return (

        <Dialog.Root open = {open} onOpenChange={setOpen}>
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
                        <form onSubmit = {handleSubmit(onSubmit)}> 
                        <fieldset className="Fieldset">
                            <label className="Label">
                                Number of passengers
                            </label>
                            <input className="Input" 
                            type="number"
                            name="passengers"
                            placeholder="0"
                            {...register("passengers")} />
                        </fieldset>
                        <label className="Label">{errors.passengers?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label">
                                Split Gas?
                            </label>
                            <select className="Input" 
                            name="splitgas"
                            {...register("splitgas")}>
                                <option value="">Choose an option: </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                        </fieldset>
                        <label className="Label">{errors.splitgas?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label">Destination</label>
                            <input className="Input"
                            placeholder="Destination"
                            name = "destination"

                            {...register("destination")} 
                            ></input>
                        </fieldset>
                        <label className="Label">{errors.destination?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label" >Departure Date</label>
                            <input className="Input" type="date"
                            name="departureDate"
                            {...register("departureDate")}
                            ></input>
                        </fieldset>
                        <label className="Label">{errors.departureDate?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label">Departure Location</label>
                            <input className="Input"
                            placeholder="Departure Location"
                            name="departureLocation"
                            {...register("departureLocation")} 
                            ></input>
                        </fieldset>
                        <label className="Label">{errors.departureLocation?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label">Description (optional)</label>
                            <input className="Input"
                            name="description"
                            {...register("description")}
                            ></input>
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <input className="Button green" value="Post" type="submit" ></input>
                        </div>

                        </form>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default RideForm