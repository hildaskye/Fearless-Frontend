window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/';
    try {
        const locationResponse = await fetch(url);
        if(!locationResponse.ok){
            console.error("Ehhh.. something broke ¯\_(ツ)_/¯", error);
        } else {
            const data = await locationResponse.json();
            const selectTag = document.getElementById('location');
            for (let location of data.locations) {
                const option = document.createElement('option');
                option.value = location.id;
                option.innerHTML = location.name;
                selectTag.appendChild(option);
            }
        }
    }catch (error){
        console.error("Jeepers miss, something broke!", error)
    }

    const conferenceForm = document.getElementById("create-conference-form");
    conferenceForm.addEventListener('submit', async (e) => {
        e.preventDefault();

    const formData = new FormData(conferenceForm);
    const json = JSON.stringify(Object.fromEntries(formData));

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
        conferenceForm.reset();
        const newConference = await response.json();
        console.log(newConference)
    } else{
        console.error("Error response from server:")
    }
  });
});
