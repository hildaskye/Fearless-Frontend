window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/';
    try {
        const locationResponse = await fetch(url);
        if(!locationResponse.ok){
            console.error("Ehhh.. something broke ¯\_(ツ)_/¯", error);
        } else {
            const data = await locationResponse.json();
            const selectTag = document.getElementById('state');
            for (let state of data.states) {
                const option = document.createElement('option');
                option.value = Object.values(state);
                option.innerHTML = Object.keys(state);
                selectTag.appendChild(option);
            }
        }
    }catch (error){
        console.error("Jeepers miss, something broke!", error)
    }

    const locationForm = document.getElementById("create-location-form");
    locationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

    const formData = new FormData(locationForm);
    const json = JSON.stringify(Object.fromEntries(formData));

    const locationUrl = "http://localhost:8000/api/locations/";
    const fetchConfig = {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = fetch(locationUrl, fetchConfig);
    if (response.ok) {
        locationForm.reset();
        const newLocation = await response.json();
        console.log(newLocation)
    } else {
        console.error("Error submitting form:", response.status, response.statusText);
        const error = await response.text();
        console.error("Error response from server:", error);
    }
  });
});
