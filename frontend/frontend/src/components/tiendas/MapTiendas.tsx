/// <reference types="google.maps" />
import { useCallback, useEffect, useState } from 'react';

import {
    Map,
    AdvancedMarker,
    Pin,
    useMap,
} from '@vis.gl/react-google-maps';
import type { MapCameraChangedEvent } from '@vis.gl/react-google-maps';

import "./MapTiendas.css";


type Poi = { key: string, location: google.maps.LatLngLiteral };

const locations: Poi[] = [
    { key: "sede_central", location: { lat: 37.28868607643938, lng: -7.1384407865092 } },
    { key: "cartaya", location: { lat: 37.28493412011883, lng: -7.152613799999999 } },
    { key: "lepe", location: { lat: 37.273810507090744, lng: -7.200280787577575 } },
    { key: "isla_cristina", location: { lat: 37.19973795284528, lng: -7.323231771163599 } },
    { key: "trigueros", location: { lat: 37.38294821380596, lng: -6.834348815345601 } },
    { key: "san_juan_del_puerto", location: { lat: 37.31420275995013, lng: -6.842108184654399 } },
    { key: "la_palma_del_condado", location: { lat: 37.38784090944442, lng: -6.5515350865092 } },
    { key: "gibraleon", location: { lat: 37.375910899509336, lng: -6.9700808134907986 } },
    { key: "ayamonte_1", location: { lat: 37.20990289850509, lng: -7.402773671163597 } },
    { key: "ayamonte_2", location: { lat: 37.21365335820485, lng: -7.405458257672801 } },
    { key: "huelva_1", location: { lat: 37.27898718498102, lng: -6.9410262 } },
    { key: "huelva_2", location: { lat: 37.26000015525552, lng: -6.9352417288364006 } },
    { key: "huelva_3", location: { lat: 37.26755692738138, lng: -6.943401086509199 } },
    { key: "palos_de_la_frontera", location: { lat: 37.22941556413237, lng: -6.894305386509201 } },
    { key: "almonte", location: { lat: 37.26121817528078, lng: -6.516700426981598 } },
    { key: "bonares", location: { lat: 37.32294383607817, lng: -6.682125171163599 } },
    { key: "bollullos_par_del_condado", location: { lat: 37.33937384625439, lng: -6.5365929693087965 } },
    { key: "moguer", location: { lat: 37.27640673801208, lng: -6.838128784654398 } },
    { key: "rociana_del_condado", location: { lat: 37.30976460117003, lng: -6.598172755818 } },
    { key: "san_bartolome_de_la_torre", location: { lat: 37.44665150871537, lng: -7.104153199999999 } },
    { key: "valverde", location: { lat: 37.57283010703711, lng: -6.753695413490798 } }
];

interface MapTiendasProps {
    selectedTienda: any;
}

// Componente que usa useMap - DEBE estar dentro de <Map>
function MapContent({ selectedTienda, locations }: { selectedTienda: any, locations: Poi[] }) {
    const map = useMap();
    const [mapError, setMapError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            setMapError(null);
            
            if (!map) {
                setIsLoading(true);
                return;
            }

            setIsLoading(false);

            if (selectedTienda && selectedTienda.lat && selectedTienda.lng) {
                map.panTo({
                    lat: selectedTienda.lat,
                    lng: selectedTienda.lng
                });
                map.setZoom(15);
            }
        } catch (error) {
            console.error('Error al cargar el mapa:', error);
            setMapError('No pudimos cargar el mapa. Por favor, intenta recargar la página.');
            setIsLoading(false);
        }
    }, [selectedTienda, map]);

    const PoiMarkers = (props: { pois: Poi[] }) => {
        const poiGoogleMapsUrls: { [key: string]: string } = {
            sede_central: "https://www.google.com/maps/place/Toscamare/@37.2885367,-7.1384086,17z/data=!3m1!4b1!4m6!3m5!1s0xd1032565978d5f7:0xf87f8eb20d911df1!8m2!3d37.2885367!4d-7.1384086!16s%2Fg%2F11b8v9p8bw!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D",
            cartaya: "https://www.google.com/maps/place/Toscamare+Cartaya/@37.2847762,-7.1526138,17z/data=!3m1!4b1!4m6!3m5!1s0xd10330d0bae07bb:0x759533e35a6ab16b!8m2!3d37.2847762!4d-7.1526138!16s%2Fg%2F11dx8j9pz1!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D",
            lepe: "https://www.google.com/maps/place/Toscamare+Lepe/@37.2557772,-7.8127686,10z/data=!4m6!3m5!1s0xd1031ddca6b2db5:0x734eee27b1f154f!8m2!3d37.2557772!4d-7.2030274!16s%2Fg%2F11f03pdbyk?authuser=0&coh=277533&entry=tts&g_ep=EgoyMDI1MTIwOS4wIPu8ASoKLDEwMDc5MjA2N0gBUAM%3D&skid=10cbc9a6-dbe3-4e65-bd34-1211513c47f2",
            isla_cristina: "https://www.google.com/maps?q=Toscamare+Isla+Cristrina,+mercado+centro+commercial+tiendas,+C.+de+Sitges,+21410+Isla+Cristina,+Huelva&ftid=0xd1024f6221c7f5b:0x434179d85a9a9a49&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=c833d29c-a4f9-4096-abbf-befb3dbee632&g_st=ic",
            trigueros: "https://www.google.com/maps?q=Toscamare+Trigueros,+C.+Amargura,+11,+21620+Trigueros,+Huelva&ftid=0xd11c1fe7fe296f9:0x8fac925c625ff29f&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAINeCAypRLDk0MjU5NTUwLDk0Mjk3Njk1LDk0Mjg0NDkzLDk0MjMxMTg4LDk0MjgwNTY4LDQ3MDcxNzA0LDk0MjE4NjQxLDk0MjgyMTM0LDk0Mjg2ODY5QgJFUw%3D%3D&skid=47998525-b3b3-4896-a23a-4569dc24384a&g_st=ic",
            san_juan_del_puerto: "https://www.google.com/maps?q=Toscamare+San+Juan+del+Puerto,+C.+Carmen,+20,+21610+San+Juan+del+Puerto,+Huelva&ftid=0xd11c556aac5f937:0x7d7ee753321d6fd1&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=521f3013-b211-45eb-9768-582aa58fe5d8&g_st=ic",
            la_palma_del_condado: "https://www.google.com/maps?q=Toscamare+La+Palma+del+Condado,+Plaza+Pedro+Alonso+Morgado,+1,+21700+La+Palma+del+Condado,+Huelva&ftid=0xd11f3b56a75dd75:0x5070fe0d6fe7c37d&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=6f987ebf-390d-4b5a-9e82-d869fa04d6df&g_st=iw",
            gibraleon: "https://www.google.com/maps/place/Toscamare/@37.3757958,-6.970113,17z/data=!3m1!4b1!4m6!3m5!1s0xd11c9abd8184147:0xfaccc69b28ac5dca!8m2!3d37.3757958!4d-6.970113!16s%2Fg%2F11jg_dzdrn!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D",
            ayamonte_1: "https://www.google.com/maps/place/Toscamare/@37.209779,-7.4027844,17z/data=!3m1!4b1!4m6!3m5!1s0xd102381fd24b775:0xf62003f9f301fe02!8m2!3d37.209779!4d-7.4027844!16s%2Fg%2F11k7kf01vw!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D",
            ayamonte_2: "https://www.google.com/maps?q=Toscamare+Ayamonte+2,+Av.+de+Andaluc%C3%ADa,+25,+21400+Ayamonte,+Huelva&ftid=0xd1023d0a66489e1:0x5e7e563acc24cc05&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=e574a611-5231-40f4-90d7-d1839a0be519&g_st=ic",
            huelva_1: "https://www.google.com/maps?q=Toscamare+Huelva+1,+C.+Severo+Ochoa,+12,+21005+Huelva&ftid=0xd11cfcf02114c4b:0xe32e89f3039072a0&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=4e284a85-8955-41a5-a9d2-a8ea3884a4a5&g_st=ic",
            huelva_2: "https://www.google.com/maps?q=Toscamare+Huelva+2,+Av.+Jos%C3%A9+Fari%C3%B1a,+28,+21006+Huelva&ftid=0xd11d01c76212f49:0xbc5c2598ce733a5a&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=144ccf7a-47c1-480b-ad97-173cec340c29&g_st=ic",
            huelva_3: "https://www.google.com/maps?q=Toscamare,+C.+Marqu%C3%A9s+de+Dosfuentes,+2,+bloque+B+escalera+A,+21004+Huelva&ftid=0xd11cf19434cdba9:0xe78a17b70b7cd4f7&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=79fcf1e8-ed3a-4564-8ee6-37032e2962f4&g_st=ipc",
            palos_de_la_frontera: "https://www.google.com/maps?q=Toscamare+Palos+de+la+Frontera,+C.+Reyes+Cat%C3%B3licos,+24,+21810+Palos+de+la+Frontera,+Huelva&ftid=0xd11dbf0f53cb579:0x3ff6cdd667a75229&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=f5794164-e738-4c04-92d0-c03a740f290d&g_st=ipc",
            almonte: "https://www.google.com/maps?q=Toscamare,+C.+Venida+de+la+Virgen,+34,+21730+Almonte,+Huelva&ftid=0xd0e030000000001:0xd25fdeb3bdd3f52f&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=26b289cd-c6a5-4dc2-88e8-2a041d51c8b1&g_st=ipc",
            bonares: "https://www.google.com/maps?q=Toscamare+Bonares,+C.+Esperanza,+35,+21830+Bonares,+Huelva&ftid=0xd11e920813494c7:0xae384e1042ff072d&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=1aa419b5-1a18-4806-b045-201b5a2e1d50&g_st=ic",
            bollullos_par_del_condado: "https://www.google.com/maps?q=Toscamare+Bollullos+Par+del+Condado,+C.+Mariano+Ayala,+5,+21710+Bollullos+Par+del+Condado,+Huelva&ftid=0xd11f10754c291db:0x482ae543fa7dffaa&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=4a877e44-f2a1-451b-8311-ca89c77d1e63&g_st=ipc",
            moguer: "https://www.google.com/maps?q=Toscamare+Moguer,+C.+S%C3%A1nchez+Mora,+3,+21800+Moguer,+Huelva&ftid=0xd11c4a97c328cdd:0x4150519005e86090&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=a8c98a0b-e603-4cf2-9d9b-b31ed8f67fe2&g_st=ipc",
            rociana_del_condado: "https://www.google.com/maps?q=Toscamare+Rociana+del+Condado,+Av.+Villarrasa,+4,+21720+Rociana+del+Condado,+Huelva&ftid=0xd11ef1daa9de479:0xe1391ce131bd000f&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=a017a264-1197-4fda-bb63-a1df871c70c1&g_st=ipc",
            san_bartolome_de_la_torre: "https://www.google.com/maps?q=Toscamare+San+Bartolom%C3%A9+de+la+Torre,+Av.+Andaluc%C3%8Da,+115,+21510+S.+Bartolom%C3%A9+de+la+Torre,+Huelva&ftid=0xd104b88f8719d3f:0xede9d67cd4f78e10&entry=gps&shh=CAE&lucs=,94259550,94297695,94284493,94231188,94280568,47071704,94218641,94282134,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAIIgnKlEsOTQyNTk1NTAsOTQyOTc2OTUsOTQyODQ0OTMsOTQyMzExODgsOTQyODA1NjgsNDcwNzE3MDQsOTQyMTg2NDEsOTQyODIxMzQsOTQyODY4NjlCAkVT&skid=3fc35ea1-8368-44e1-bdbc-e0e772728911&g_st=ipc",
            valverde: "https://www.google.com/maps/place/Toscamare/@37.5726898,-6.7537276,17z/data=!3m1!4b1!4m6!3m5!1s0xd11bd7cf7e2842d:0x7611c18d2c4d5107!8m2!3d37.5726898!4d-6.7537276!16s%2Fg%2F11fvmg372s!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D"
        };

        // Eliminado clusterer y refs de markers

        const handleMarkerClick = useCallback((poiKey: string, location: google.maps.LatLngLiteral) => {
            const url = poiGoogleMapsUrls[poiKey]
                || `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
            window.open(url, '_blank');
        }, []);

        // El InfoWindow y el estado relacionado ya no son necesarios

        // Opcional: Mapeo de nombres bonitos para las tiendas


        return (
            <>
                {props.pois.map((poi: Poi) => (
                    <AdvancedMarker
                        key={poi.key}
                        position={poi.location}
                        clickable={true}
                        onClick={() => handleMarkerClick(poi.key, poi.location)}
                    >
                        <Pin background={'#2563eb'} glyphColor={'#fff'} borderColor={'#fff'} />
                    </AdvancedMarker>
                ))}
            </>
        );
    };

    // Error State
    if (mapError) {
        return (
            <section className='map'>
                <div className='map-error'>
                    <div className='error-icon'>⚠️</div>
                    <h3>Error al cargar el mapa</h3>
                    <p>{mapError}</p>
                    <button onClick={() => window.location.reload()} className='retry-button'>
                        Recargar página
                    </button>
                </div>
            </section>
        );
    }

    // Error State
    if (mapError) {
        return (
            <section className='map'>
                <div className='map-error'>
                    <div className='error-icon'>⚠️</div>
                    <h3>Error al cargar el mapa</h3>
                    <p>{mapError}</p>
                    <button onClick={() => window.location.reload()} className='retry-button'>
                        Recargar página
                    </button>
                </div>
            </section>
        );
    }

    // Loading State
    if (isLoading) {
        return (
            <section className='map'>
                <div className='map-skeleton'>
                    <div className='skeleton-pulse' />
                </div>
            </section>
        );
    }

    return (
        <>
            <PoiMarkers pois={locations} />
        </>
    );
}

// Componente principal
function MapTiendas(props: MapTiendasProps) {
    return (
        <section className='map'>
            <Map
                defaultZoom={13}
                defaultCenter={{ lat: 37.26638, lng: -6.94004 }}
                mapId='7c137eab27055fdec74bec10'
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }>
                <MapContent selectedTienda={props.selectedTienda} locations={locations} />
            </Map>
        </section>
    );
}

export default MapTiendas