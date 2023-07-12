import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Map } from "@googlemaps/react-wrapper";
import GoogleMapReact from "google-map-react";

function Maps(props) {
  function findPlace() {
    // let uva = new google.maps.LatLng(38.033, 78.5);
    // const service = new google.maps.places.PlacesService();
  }
  return (
    <Dialog.Root style={{ height: '100vh', width: '100%', zIndex: 10 }}>
      <Dialog.Trigger asChild>
        <button className="Button violet">Open Map</button>
      </Dialog.Trigger>
      <Dialog.Portal >
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Route to Departure Location
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please allow your location to be shared
          </Dialog.Description>
          <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDXx0bmiNGfVZPxGYcVJt2s_0UcsBMTkB0" }}
            defaultCenter={{ lat: 38.033, lng: -78.5 }}
            defaultZoom={11}
          >
          </GoogleMapReact>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Maps;
