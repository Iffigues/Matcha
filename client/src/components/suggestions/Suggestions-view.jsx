import React from 'react';
import Flash from '../flash';
import avatar from '../../avatar.jpg';
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css'
import './Suggestions.css';
import { Link } from "react-router-dom";

function Suggestions(props) {
	return (
		<div className="Suggestions">
			<div className="container">
				<h2 className="mt-2">Suggestions</h2>
				<Flash errors={props.errors}/>
				<Flash notices={props.notices}/>		
				<p>
					<a data-toggle="collapse" href="#options" role="button" aria-expanded="false" aria-controls="options">Options</a>
				</p>
				<div className="row pb-4">
					<div className="collapse multi-collapse col-sm-12 pb-4" id="options">
						<div className="row">
							<div className="input-group mb-2 col-sm-4">
								<div className="input-group-prepend">
									<div className="input-group-text">Tri par</div>
								</div>
								<select onChange={props.onSortChange} className="custom-select">
									<option value="0" defaultValue>Suggestions</option>
									<option value="1">Âge</option>
									<option value="2">Popularité</option>
									<option value="3">Localisation</option>
									<option value="4">Intérets communs</option>
									<option value="5">Furries communs</option>
								</select>
							</div>
							<div className="input-group mb-2 col-sm-4">
								<div className="input-group-prepend">
									<div className="input-group-text">Centres d'intérets</div>
								</div>
								<select onChange={props.onTagsChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
									<option value="0" defaultValue>Choisir</option>
									{props.allTags.map((value, key) => {
										return (<option key={key} value={value.name}>{value.name} ({value.nbr})</option>);
									})}
								</select>
							</div>
							<div className="input-group mb-2 col-sm-4">
								<div className="input-group-prepend">
									<div className="input-group-text">Furry</div>
								</div>
								<select onChange={props.onFurriesChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
									<option value="0" defaultValue>Choisir</option>
									{props.allFurries.map((value, key) => {
										return (<option key={key} value={value.name}>{value.name} ({value.nbr})</option>);
									})}
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
							</div>
							<div className="col-sm-4">
								{props.tags.map((value, key) => {
									return (<span key={key} className="badge badge-secondary mr-1">{value} <button type="button" value={value} onClick={props.onRemoveTagClick}>x</button></span>);
								})}
							</div>
							<div className="col-sm-4">
								{props.furries.map((value, key) => {
									return (<span key={key} className="badge badge-secondary mr-1">{value} <button type="button" value={value} onClick={props.onRemoveFurryClick}>x</button></span>);
								})}
							</div>
						</div>
						<div className="row">
							<div className="input-group col-sm-4">
								<div className="text-center col-sm-12">
									<label className="col-form-label">Âge</label>
								</div>
								<InputRange
									name="age"
									maxValue={props.ageMaxRange.max > props.ageMaxRange.min ? props.ageMaxRange.max : props.ageMaxRange.min + 1}
									minValue={props.ageMaxRange.min}
									value={props.ageRange}
									onChange={props.onAgeRangeChange}
								/>
							</div>
							<div className="input-group col-sm-4">
								<div className="text-center col-sm-12">
									<label className="col-form-label">Popularité</label>
								</div>
								<InputRange
									name="pop"
									maxValue={props.popMaxRange.max > props.popMaxRange.min ? props.popMaxRange.max : props.popMaxRange.min + 1}
									minValue={props.popMaxRange.min}
									value={props.popRange}
									onChange={props.onPopRangeChange}
								/>
							</div>
							<div className="input-group col-sm-4">
								<div className="text-center col-sm-12">
									<label className="col-form-label">Distance</label>
								</div>
								<InputRange
									name="dist"
									maxValue={props.distMaxRange.max > props.distMaxRange.min ? props.distMaxRange.max : props.distMaxRange.min + 1}
									minValue={props.distMaxRange.min}
									value={props.distRange}
									onChange={props.onDistRangeChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					{props.profiles.slice(0, props.load).map((pro, key) => {
						const pp = pro.profilephoto ? ":8080/" + pro.profilephoto : avatar;
						return (
							<div key={key} className="col-sm-2 pb-4">
								<img className="rounded-top img-fluid" src={pp} alt="" />
								<div className="border rounded-bottom p-2">
									<h5><Link to={"/profiles/" + pro.id}>{pro.firstname}</Link></h5>
									<div>{pro.age} - {pro.city}</div>
									<div>
										{pro.furries.map((furry, key) => {
											return (key > 1 ? <span key={key}></span> : <span key={key} className="badge badge-danger mr-1">{furry.name}</span>);
										})}
									</div>
									<div>
										{pro.tags.map((tag, key) => {
											return (key > 1 ? <span key={key}></span> : <span key={key} className="badge badge-secondary mr-1">{tag.tag}</span>);
										})}
									</div>
									<div className="text-center pt-3">
										<button value={pro.id} className={"btn-sm btn" + (!pro.like ? "-outline" : "") + "-primary m-1"} onClick={props.onLikeClick}>J'aime</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Suggestions;