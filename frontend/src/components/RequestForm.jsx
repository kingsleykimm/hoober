import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form"
import { Cross2Icon } from '@radix-ui/react-icons';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import { useState } from "react"

function RequestForm(props) {
    const formSchema = Yup.object().shape({
        splitgas: Yup.string()
        .required("Please select an option"),
        destination: Yup.string()
        .required("Please provide a destination"),
        departureDate : Yup.date()
        .required("Please provide a Departure Date"),
        description: Yup.string()
    });
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
        

        const response = await fetch("http://localhost:4000/requests/", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        props.onChangeData()
        reset()

    }
    const onUpdate = async(data) => {
        setOpen(false)

        const requestOptions = {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                user: JSON.parse(localStorage.getItem("curUser")),
                id: props.request.id,
            },
            )
        }
        

        const response = await fetch("http://localhost:4000/requests/", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        props.onChangeData()
        reset()
    }
    return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
        {
                props.isEdit ? <Dialog.Trigger asChild>
                    <button className="Button green">Edit Request</button>
                </Dialog.Trigger> :
                <Dialog.Trigger asChild>
                    <button className="Button violet">Add Request</button>
                </Dialog.Trigger>
            }
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay">
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">{props.isEdit ? "Edit Request" : "Add Request"}</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Post a Ride Request
                    </Dialog.Description>
                    <form onSubmit = {props.request ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
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
                        <label className="Label errorLabel">{errors.splitgas?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label">Destination</label>
                            <input className="Input"
                            placeholder="Destination"
                            name = "destination"
                            defaultValue={props.request && props.request.DESTINATION}

                            {...register("destination")} 
                            ></input>
                        </fieldset>
                        <label className="Label errorLabel">{errors.destination?.message}</label>
                        <fieldset className="Fieldset">
                            <label className="Label" >Departure Date</label>
                            <input className="Input" type="date"
                            name="departureDate"
                            {...register("departureDate")}
                            defaultValue={props.request && props.request.DEPARTUREDATE}
                            ></input>
                        </fieldset>
                        <label className="Label errorLabel">{errors.departureDate && "Please provide a departure date"}</label>
                       
                        <fieldset className="Fieldset">
                            <label className="Label">Description (optional)</label>
                            <input className="Input"
                            name="description"
                            defaultValue = {props.request && props.request.DESCRIPTION}
                            {...register("description")}
                            ></input>
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <input className="Button green" value={props.request ? "Update" : "Post"} type="submit" ></input>
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


export default RequestForm; 