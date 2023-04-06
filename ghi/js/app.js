function createCard(pictureUrl, title, location, description, dateStart, dateEnd) {
  return `
    <div class="card">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer text-muted">
      ${dateStart} - ${dateEnd}
      </div>
    </div>
  `;
}

function errorMessage(error){
  return `
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;"></svg><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </symbol></>
  </svg>
  <div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    Error! Error! Error code ${error}!
  </div>
  </div>
  `
}


window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';
  const columns = document.querySelectorAll('.col-md-4');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      errorMessage(error)
    } else {
      const data = await response.json();

      for (let i = 0; i < data.conferences.length; i++) {
        const conference = data.conferences[i];
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);

        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const dateStart = new Date(details.conference.starts).toLocaleDateString();
          const dateEnd = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name;
          const html = createCard(pictureUrl, title, location, description, dateStart, dateEnd);
          const column = columns[i % columns.length];
          column.innerHTML += html;
          console.log(html);
        }
      }
    }
  } catch (e) {
    errorMessage(error)
  }
});
