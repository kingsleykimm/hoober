import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Map } from "@googlemaps/react-wrapper";
import GoogleMapReact from "google-map-react";

function Maps(props) {
    const infowindow = new window.google.maps.InfoWindow();
    let service;
    const defaultProps = {
        defaultZoom: 15,
        defaultCenter: {lat: 38.033, lng: -78.5},
    }
  function findPlace(map) {
    service = new window.google.maps.places.PlacesService(map);
    

    
    const request = {
        query: props.location,
        fields: ['name', 'geometry', 'place_id'],
        locationBias: {radius: 4000, center: {...defaultProps.defaultCenter}}
    }

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && props.location !== "N/A" && props.location !== "NOVA") {
            for(let i = 0; i < results.length; i++)
            {
                if(results[i].place_id) {
                    createMarker(results[i], map, results[i].place_id)
                }
                else {
                    createMarker(results[i], map)
                }
                
            }
            map.setCenter(results[0].geometry.location);
        }
        else {
            createMarker(defaultProps.defaultCenter, map, null, true)
        }
    })
  }
  function createMarker(place, map, place_id = null, noLocation = false)
  {

    if (!place.geometry || !place.geometry.location) return;
    const marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location,
      });
    if (noLocation) {
        infowindow.setContent("No address near UVA found for Departure Location!")
        infowindow.open({
            anchor: marker,
            map
        })
        return
    }
    if (place_id) {
        const req = {
            placeId: place_id,
            fields: ["address_components"]
        }
        service.getDetails(req, (result, status)  => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
                window.google.maps.event.addListener(marker, "click", () => {
                    let address = place.name + ": ";
                    for (let i = 1; i < result.address_components.length; i++)
                    { 
                        address += result.address_components[i].long_name + " "
                    }
                    infowindow.setContent(address)
                    infowindow.open({
                        anchor: marker,
                        map
                    })
                })
            }
        })
    }
  
  
  
  }
  return (
    <Dialog.Root style={{ height: "100vh", width: "100%" }}>
      <Dialog.Trigger asChild>
        <button className="Button violet">Open Map</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Map of Departure Location
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Click on the marker to see information about the location -- if no marker is shown, location is either not near UVA or could not be found by Google Maps.
          </Dialog.Description>
          <div style={{ height: "50vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDXx0bmiNGfVZPxGYcVJt2s_0UcsBMTkB0",
              }}
              defaultCenter={{ lat: 38.033, lng: -78.5 }}
              defaultZoom={16}
              onGoogleApiLoaded={({ map, maps }) => {
               findPlace(map)
              }}
            ></GoogleMapReact>
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
