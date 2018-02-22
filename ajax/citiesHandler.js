function addCity(e) {
	e.preventDefault();
	let cityName = document.getElementById("new_city").value;
	if (cityName !== "") {
		
		let xhr = new XMLHttpRequest();
		let params = JSON.stringify({
			title: cityName
		});
		xhr.open("POST", "http://localhost:3000/cities", false);
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send(params);
	}
}

function searchCity(e) {
	e.preventDefault();
	
	let citiesList = document.getElementById("cities_list")
	let cityName = document.getElementById("search_city").value;
	while (citiesList.firstChild) {
		citiesList.removeChild(citiesList.firstChild);
	}
	
	if (cityName !== "") {
		let xhr = new XMLHttpRequest();
		let params = JSON.stringify({
			title: cityName
		});
		xhr.open("GET", "http://localhost:3000/cities?q=" + encodeURIComponent(cityName), false);
		xhr.send();
		
		let cities = JSON.parse(xhr.responseText);
		for (let i = 0; i < cities.length; ++i) {
			let templateDiv = document.getElementById("template-item");
			let itemDiv = document.createElement('div');
			itemDiv.setAttribute('class', 'cities_list_item');
			itemDiv.setAttribute('id', cities[i].id.toString());
			itemDiv.innerHTML = templateDiv.textContent;
			itemDiv.getElementsByTagName("input")[0].value = cities[i].title

			citiesList.appendChild(itemDiv);
		}
	}
}

function removeCity(e) {
	e.preventDefault();
	let id = event.target.parentNode.id;
	console.log(id);
	
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", "http://localhost:3000/cities/" + id.toString(), false);
	xhr.send();
}

function changeCity(e) {
	e.preventDefault();
	let id = event.target.parentNode.id;
	let cityName = event.target.parentNode.childNodes[1].value;
	
	let xhr = new XMLHttpRequest();
	let params = JSON.stringify({
		title: cityName
	});
	xhr.open("PATCH", "http://localhost:3000/cities/" + id.toString(), false);
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(params);
	
}