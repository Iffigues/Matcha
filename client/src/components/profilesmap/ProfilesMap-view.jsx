import React from 'react';
import './ProfilesMap.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from "react-router-dom";
import avatar from '../../avatar.jpg';

function PofilesMap(props) {
	return (
		<div className="PofilesMap">
			<Map class="MapContainer" center={[props.lat, props.lng]} zoom={6} attributionControl={false}>
				<TileLayer class="TileLayer"
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{props.profiles.length
					? props.profiles.map((p, k) => {
						const photo = p.profilephoto ? 'http://' + document.location.hostname + ':8080/' + p.profilephoto : avatar;
						return (<Marker key={k} riseOnHover="true" position={[p.lat, p.lng]}>
							<Popup>
								<ul>
									<li><img src={photo} width="100px" alt="..."/></li>
									<li><Link to={'/profiles/' + p.id}>{p.firstname} {p.lastname}</Link></li>
									<li>{p.age} ans</li>
									<li>{p.city}</li>
									<li>{p.distance}</li>
								</ul>
							</Popup>
						</Marker>)
					})
					: null
				}
			</Map>
		</div>
	);
}

export default PofilesMap;