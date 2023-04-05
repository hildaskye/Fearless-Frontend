function createCard(pictureUrl, title, location, description, datestart, dateend) {
  return `
    <div class="card">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer text-muted">
      ${datestart} - ${dateend}
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';
  const columns = document.querySelectorAll('.col-md-4');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
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
          const datestart = new Date(details.conference.starts).toLocaleDateString();
          const dateend = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name
          const html = createCard(pictureUrl, title, location, description, datestart, dateend);
          const column = columns[i % columns.length];
          column.innerHTML += html;
          console.log(html);
        }
      }
    }
  } catch (e) {
    // Figure out what to do if an error is raised
  }
});
