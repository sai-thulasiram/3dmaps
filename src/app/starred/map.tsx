"use client"

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSize } from 'react-hook-size'

import Mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup, useMap } from 'react-map-gl';
import WebMercatorViewport, {
  Bounds,
  ViewportProps
} from "viewport-mercator-project";
import { Canvas, Coordinates } from "react-three-map";
import { Environment, OrthographicCamera, OrbitControls } from '@react-three/drei'
import { maxBy, minBy } from "lodash";


import Model from './Model'
import Model2 from './Model2'
import Model3 from './Model3'

const typeModelMapping: Record<string, any> = {
  'model': Model,
  'model2': Model2,
  'model3': Model3
};

type MarkerType = {
  id: string;
  latitude: number;
  longitude: number;
};

function MapView({devices, selectedDevice, selectDevice}: {devices: any, selectedDevice: any, selectDevice: any}) {

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [popupInfo, setPopupInfo] = useState<any | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ;

  Mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  const { width, height } = useSize(mapContainerRef)

  const [viewport, setViewport] = useState({
    width: width || 400,
    height: height || 400
  });

  useEffect(() => {
    if(width && height){
      setViewport((viewport) => ({ 
        ...viewport, 
        width, 
        height 
      }));
    }
  }, [width, height]);


  const getMinOrMax = (markers: MarkerType[], minOrMax: "max" | "min", latOrLng: "latitude" | "longitude") => {
    if (minOrMax === "max") {
      return (maxBy(markers, value => value[latOrLng]) as any)[latOrLng];
    } else {
      return (minBy(markers, value => value[latOrLng]) as any)[latOrLng];
    }
  };
  
  const getBounds = (markers: MarkerType[]) => {
    const maxLat = getMinOrMax(markers, "max", "latitude");
    const minLat = getMinOrMax(markers, "min", "latitude");
    const maxLng = getMinOrMax(markers, "max", "longitude");
    const minLng = getMinOrMax(markers, "min", "longitude");
  
    const southWest = [minLng, minLat];
    const northEast = [maxLng, maxLat];
    return [southWest, northEast];
  };

  useEffect(() => {
    if (width && height) {
      const MARKERS: MarkerType[] = devices.map((device : any) => {
        return (
          {
            id: device.title,
            latitude: device.position.latitude,
            longitude: device.position.longitude
          }

        )});
      
      const MARKERS_BOUNDS = getBounds(MARKERS);
      setViewport((viewport) => {
        const NEXT_VIEWPORT = new WebMercatorViewport({
          ...(viewport as WebMercatorViewport),
          width,
          height,
        }).fitBounds(MARKERS_BOUNDS as Bounds, {
           padding: 100
        });

        return {...NEXT_VIEWPORT, pitch: 90, zoom: 7};
      });
    }
  }, [width, height]);

  useEffect(() => {
    setFlyTo(selectedDevice);
  }, [selectedDevice])

  const setFlyTo = (device: any) => {
    const { current: map } = mapRef;
    map?.flyTo({center: [device.position.longitude, device.position.latitude], zoom: 11,
      speed: 0.8});
  };

  const onViewportChange = (nextViewport: any) => setViewport({...nextViewport})


  return <div ref={mapContainerRef} style={{ height: 'calc(100vh - 230px)', width: 'calc(100vw - 200px)' }}>
    {mapboxToken && <Map
      ref={mapRef}
      // antialias
      initialViewState={{
        zoom: 7,
        pitch: 90,
      }}
      {...viewport}
      onMove={evt => onViewportChange(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {
        devices.map((device : any) => {
          return (
            <Marker
              key={device.title} 
              longitude={device.position.longitude} 
              latitude={device.position.latitude} 
              anchor="bottom" 
              color="#1976d2"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(device);
                selectDevice(device);
                
              }}
            >
            </Marker> 
          )
        })
      }
      <Canvas latitude={devices[0].position.latitude} longitude={devices[0].position.longitude}>
        <hemisphereLight
          args={["#ffffff", "#60666C"]}
          position={[1, 4.5, 3]}
        />
        {
        devices.map((device : any) => {
            const ModelComponent = typeModelMapping[device.type];
            return (
              <Coordinates key={device.title}  latitude={device.position.latitude} longitude={device.position.longitude} altitude={device.position.altitude || 0} >
                <object3D scale={1000}>
                  <Suspense fallback={null}>
                    <ModelComponent />
                    <Environment preset="city" />
                  </Suspense>
                </object3D>
              </Coordinates>
            )
          })
        }
        
        <OrbitControls />
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 200]}
        />
      </Canvas>
      {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo?.position?.longitude)}
            latitude={Number(popupInfo?.position?.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.title}, {popupInfo.subheader} 
                          </div>
            
          </Popup>
        )}
    </Map>}
  </div>
}

export default MapView;