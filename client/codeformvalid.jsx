		// if (e.target.checkValidity() === false) {
  //         e.preventDefault();
  //         e.stopPropagation();
  //       }
  //       e.target.classList.add('was-validated');

		// const rgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// let errors = [];

		// if (data['username'].length === 0)
		// 	errors.push("Il manque le nom d'utilisateur");
		// else if (data['username'].length < 4)
		// 	errors.push("Le nom d'utilisateur doit faire minimum 4 caractères");
		// else if (!/[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž _-]+/.test(data['username']))
		// 	errors.push("Le nom d'utilisateur ne peut contenir certains caractères spéciaux");

		// if (data['firstname'].length === 0)
		// 	errors.push("Il manque le prénom");
		// else if (!/[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž _-]+/.test(data['firstname']))
		// 	errors.push("Le prénom ne peut contenir certains caractères spéciaux");

		// if (data['lastname'].length === 0)
		// 	errors.push("Il manque le nom");
		// else if (!/[A-Za-z0-9αßÁáÀàÅåÄäÆæÇçÉéÈèÊêÍíÌìÎîÑñÓóÒòÔôÖöØøÚúÙùÜüŽž _-]+/.test(data['lastname']))
	 // 		errors.push("Le nom ne peut contenir certains caractères spéciaux");
		
		// if (data['email'].length === 0)
		// 	errors.push("Il manque l'adresse email");
		// else if (!rgx.test(String(data['email']).toLowerCase()))
		// 	errors.push("L'adresse email est mal formée");

		// if (data['password'].length === 0)
		// 	errors.push("Il manque le mot de passe");
		// else if (data['password'].length < 8)
		// 	errors.push("Le mot de passe doit faire au moins 8 caractères");
		// else {
		// 	if (!/.*[0-9]+.*/.test(data['password']))
		// 		errors.push("Le mot de passe doit inclure au moins 1 nombre");
		// 	if (!/.*[a-z]+.*/.test(data['password']))
		// 		errors.push("Le mot de passe doit inclure au moins 1 lettre minuscule");
		// 	if (!/.*[A-Z]+.*/.test(data['password']))
		// 		errors.push("Le mot de passe doit inclure au moins 1 lettre majuscule");
		// 	if (!/.*[!A-Za-z0-9]+.*/.test(data['password']))
		// 		errors.push("Le mot de passe doit inclure au moins 1 caractère spécial");
		// 	if (data['password'].localeCompare(data['confirm']))
		// 		errors.push("Vous devez retaper le mot de passe à l'identique");
		// }

		// if (errors.length > 0)
		// 	this.setState({errors: errors, notice: []});
		// else {
		// 	fetch('http://gopiko.fr:8080/register', {
		// 		method: 'POST',
		// 		headers: {
		// 			Accept: 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(data),
		//     })
		//     .then(response => {
		//     	if (response.ok) {
		//     		console.log(response.json());
		// 	   		this.setState({errors: [], notices: ["Envoyé"]});
		//     	} else
	 //    		    console.log('Mauvaise réponse du réseau');
		//     })
		//     .catch(error => {
  // 				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
		// 	});
		// }