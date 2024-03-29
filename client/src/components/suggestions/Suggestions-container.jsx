import React from 'react';
import Suggestions from './Suggestions-view.jsx';
import debounce from "lodash.debounce";
import { Redirect } from "react-router-dom";

class SuggestionsContainer extends React.Component {

	_isMounted = false;

	constructor() {
		super();
		this.state = {
			ageRange: {min: 0, max: 99999},
			ageMaxRange: {min: 0, max: 99999},
			popRange: {min: 0, max: 99999},
			popMaxRange: {min: 0, max: 99999},
			distRange: {min: 0, max: 99999},
			distMaxRange: {min: 0, max: 99999},
			tags: [],
			allTags: [],
			furries: [],
			allFurries: [],
			sort: 0,
			profiles: [],
			saveProfiles: [],
			load: 18
		}
		this.handleAgeRangeChange = this.handleAgeRangeChange.bind(this);
		this.handlePopRangeChange = this.handlePopRangeChange.bind(this);
		this.handleDistRangeChange = this.handleDistRangeChange.bind(this);
		this.handleTagsChange = this.handleTagsChange.bind(this);
		this.handleFurriesChange = this.handleFurriesChange.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleRemoveTagClick = this.handleRemoveTagClick.bind(this);
		this.handleRemoveFurryClick = this.handleRemoveFurryClick.bind(this);
		this.handleLikeClick = this.handleLikeClick.bind(this);
		this.sortAndFilter = this.sortAndFilter.bind(this);
		window.onscroll = debounce(() => {
			if (window.innerHeight + document.documentElement.scrollTop
				=== document.documentElement.offsetHeight && this._isMounted) {
				this.setState({load: this.state.load + 30});
			}
		}, 100);
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	fetchData() {
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/search/suggestions', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => {
					if (data.code === 0 && this._isMounted) {
						if (data.profiles.length > 0) {
	 						const ages = data.profiles.map(p => p.age);
							const pops = data.profiles.map(p => p.popularity);
							const dists = data.profiles.map(p => Math.round(p.distance));
							const ageRange = {
								min: Math.min.apply(Math, ages),
								max: Math.max.apply(Math, ages) + 1
							};
							const popRangeMin = Math.min.apply(Math, pops) - 1;
							const popRange = {
								min: popRangeMin < 0 ? 0 : popRangeMin,
								max: Math.max.apply(Math, pops) + 1
							};
							const distRangeMin = Math.min.apply(Math, dists) - 100;
							const distRange = {
								min: distRangeMin < 0 ? 0 : distRangeMin,
								max: Math.max.apply(Math, dists) + 100
							};
							this.setState({
								ageRange: ageRange,
								ageMaxRange: ageRange,
								popRange: popRange,
								popMaxRange: popRange,
								distRange: distRange,
								distMaxRange: distRange,
								profiles: data.profiles,
								saveProfiles: data.profiles
							});
						}
		 			}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
		fetch('http://' + document.location.hostname + ':8080/tag/all', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => { 
					if (data.code === 0 && data.tags && this._isMounted) {
						this.setState({allTags: data.tags});
					}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
		fetch('http://' + document.location.hostname + ':8080/furry', {
			method: 'GET',
			headers: {
				'x-access-token': token,
				Accept: 'application/json'
			}
		})
		.then(response => {
			if (response) {
				response.json().then(data => { 
					if (data.code === 0 && data.furries && this._isMounted) {
						this.setState({allFurries: data.furries});
					}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
	}

	handleAgeRangeChange(value) {
		if (value.min >= this.state.ageMaxRange.min && value.max <= this.state.ageMaxRange.max)
			this.setState({ ageRange: value });
	}

	handlePopRangeChange(value) {
		if (value.min >= this.state.popMaxRange.min && value.max <= this.state.popMaxRange.max)
			this.setState({ popRange: value });
	}

	handleDistRangeChange(value) {
		if (value.min >= this.state.distMaxRange.min && value.max <= this.state.distMaxRange.max)
			this.setState({ distRange: value });
	}

	handleTagsChange(e) {
		const val = e.target.value;
		const tags = this.state.tags.slice();
		if (!tags.includes(val))
			tags.push(val);
		this.setState({tags: tags});
		e.target.value = 0;
	}

	handleFurriesChange(e) {
		const val = e.target.value;
		const furries = this.state.furries.slice();
		if (!furries.includes(val))
			furries.push(val);
		this.setState({furries: furries});
		e.target.value = 0;
	}

	handleSortChange(e) {
		const val = e.target.value;
		if (this.state.sort !== val)
			this.setState({sort: val});
	}

	handleRemoveTagClick(e) {
		const val = e.target.value;
		const tags = this.state.tags.slice();
		const i = tags.indexOf(val);
		if (i > -1)
			tags.splice(i, 1);
		this.setState({tags: tags});
	}

	handleRemoveFurryClick(e) {
		const val = e.target.value;
		const furries = this.state.furries.slice();
		const i = furries.indexOf(val);
		if (i > -1)
			furries.splice(i, 1);
		this.setState({furries: furries});
	}

	handleLikeClick(e) {
		const d = {id: parseInt(e.target.value)};
		const token = localStorage.getItem('token');
		fetch('http://' + document.location.hostname + ':8080/like/add', {
			method: 'POST',
			headers: {
				'x-access-token': token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(d)
		})
		.then(response => {
			if (response) {
				response.json().then(data => { 
					if (data.code === 0 && this._isMounted) {
						const profiles = this.state.profiles.slice();
						profiles.forEach(profile => {
							if (profile.id === d.id)
								profile.like = data.like;
						});
						this.setState({profiles: profiles});
						this.props.addFlash("notice", data.msg);
					}
				}).catch(error => {
					console.log('Il y a eu un problème avec la lecture de la réponse');
				});
			} else
				throw Error('Pas de réponse');
		}).catch(error => {
			console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
		});
	}

	sortAndFilter() {
		let profiles = this.state.profiles.slice();
		switch (this.state.sort) {
			case "0":
				profiles = this.state.saveProfiles.slice();
				break ;
			case "1":
				profiles.sort((a, b) => a.age - b.age);
				break ;
			case "2":
				profiles.sort((a, b) => b.popularity - a.popularity);
				break ;
			case "3":
				profiles.sort((a, b) => a.distance - b.distance);
				break ;
			case "4":
				profiles.sort((a, b) => b.tagmatch - a.tagmatch);
				break ;
			case "5":
				profiles.sort((a, b) => b.furrymatch - a.furrymatch);
				break ;
			default:
		}
		profiles = profiles.filter(p => {
			return (p.age >= this.state.ageRange.min
				&& p.age <= this.state.ageRange.max
				&& p.distance >= this.state.distRange.min
				&& p.distance <= this.state.distRange.max
				&& p.popularity >= this.state.popRange.min
				&& p.popularity <= this.state.popRange.max
				&& (!this.state.tags.length
					|| this.state.tags.some(tag => p.tags.map(t => t.tag).includes(tag)))
				&& (!this.state.furries.length
					|| this.state.furries.some(furry => p.furries.map(f => f.name).includes(furry))));
		});
		return profiles;
	}

 	render() {
		if (this.props.role === "preuser")
			return <Redirect to="/account"/>;
 		const profiles = this.sortAndFilter();
		return <Suggestions
					ageRange={this.state.ageRange}
					ageMaxRange={this.state.ageMaxRange}
					distRange={this.state.distRange}
					distMaxRange={this.state.distMaxRange}
					popRange={this.state.popRange}
					popMaxRange={this.state.popMaxRange}
					
					tags={this.state.tags}
					allTags={this.state.allTags}
					furries={this.state.furries}
					allFurries={this.state.allFurries}

					profiles={profiles}

					load={this.state.load}

					onAgeRangeChange={this.handleAgeRangeChange}
					onPopRangeChange={this.handlePopRangeChange}
					onDistRangeChange={this.handleDistRangeChange}
					onTagsChange={this.handleTagsChange}
					onFurriesChange={this.handleFurriesChange}
					onSortChange={this.handleSortChange}
					onRemoveTagClick={this.handleRemoveTagClick}
					onRemoveFurryClick={this.handleRemoveFurryClick}
					onLikeClick={this.handleLikeClick}
				/>;
	}
}

export default SuggestionsContainer;
