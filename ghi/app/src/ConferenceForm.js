import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.starts = starts;
        data.name = name;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;


        console.log(data);
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('')
            setLocation('');
          }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleStartsChange = (event) => {
        setStarts(event.target.value);
    }

    const handleEndsChange = (event) => {
        setEnds(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleMaxPresentationsChange = (event) => {
        setMaxPresentations(event.target.value);
    }
    const handleMaxAttendeesChange = (event) => {
        setMaxAttendees(event.target.value);
    }

    const handleLocationsChange = function (event) {
        setLocation(event.target.value)
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange}
                                placeholder="Name"
                                required type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={name}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartsChange}
                                placeholder="Start Date"
                                required type="date"
                                name="starts"
                                id="starts"
                                className="form-control"
                                value={starts}
                            />
                            <label htmlFor="starts">Start Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndsChange}
                                placeholder="End Date"
                                required type="date"
                                name="ends"
                                id="ends"
                                className="form-control"
                                value={ends}
                            />
                            <label htmlFor="ends">End Date</label>
                        </div>
                        <div className="form-group mb-3">
                            <textarea onChange={handleDescriptionChange}
                                placeholder="Description"
                                required type="text"
                                name="description"
                                id="description"
                                className="form-control"
                                value={description}
                                rows="4"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationsChange}
                                placeholder="Maximum presentations"
                                required type="number"
                                name="max_presentations"
                                id="max_presentations"
                                className="form-control"
                                value={maxPresentations}
                                rows= "4"
                            />
                            <label htmlFor="ends">Max Presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxAttendeesChange}
                                placeholder="Maximum attendees"
                                required type="number"
                                name="max_attendees"
                                id="max_attendees"
                                className="form-control"
                                value={maxAttendees}
                            />
                            <label htmlFor="ends">Max Attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationsChange}
                                required name="location"
                                id="location"
                                className="form-select"
                                value={location}
                            >
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

    export default ConferenceForm;
