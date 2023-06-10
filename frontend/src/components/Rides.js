import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import RideForm from "./RideForm";
import Ride from "./Ride"
function Rides() {
    const getRides = async () => {
        const requestOptions = {
            method: "GET",
            mode: "cors"
        }
        const response = await fetch("http://localhost:4000/rides", requestOptions)
        const responseData = await response.json()
        console.log(responseData)
    }

    return (
        <div className="rides--page">
            <div className="rides--heading">
                <h1>Rides</h1>
                <RideForm />
            </div>

        </div>
    )
}
export default Rides;