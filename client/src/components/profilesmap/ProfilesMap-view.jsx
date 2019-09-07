import React from 'react';
import './ProfilesMap.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from "react-router-dom";
import avatar from '../../avatar.jpg';

function PofilesMap(props) {
	return (
		<div className="PofilesMap">
			<Map class="MapContainer" center={[48.859595, 2.344305]} zoom={6}>
				<TileLayer class="TileLayer"
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{props.profiles.length
					? props.profiles.map((p, k) => {
						const photo = p.profilephoto ? 'http//:8080/' + p.profilephoto : avatar;
						return (<Marker key={k} riseOnHover="true" position={[p.lat, p.lng]}>
							<Popup>
								<ul>
									<li><img src={photo} width="100px" alt="..."/></li>
									<li><Link to={'/profiles/' + p.id}>{p.firstname} {p.lastname}</Link></li>
									<li>{p.age} ans</li>
									<li>{p.city}</li>
								</ul>
							</Popup>
						</Marker>)
					})
					: <div></div>
				}
			</Map>
		</div>
	);
}

export default PofilesMap;