import L from 'leaflet';

const customIcon = (icon: any) =>
  new L.Icon({
    iconUrl: icon.dataURL,
    iconRetinaUrl: icon.dataURL,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon',
  });

export { customIcon };
