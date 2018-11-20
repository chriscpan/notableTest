const express = require('express');
const app = express();
const port = 3000;

const physicians = require('./seed/physicians.js');
const appointments = require('./seed/appointments.js');

app.use(express.static('views'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

// gets all physicians
app.get('/physicians', (req, res) => {
	res.send(physicians);
});

// gets relevant appointments based on physican id in query param
app.get('/appointments', (req, res) => {
	const relevantAppointments = [];

	appointments.forEach(appointment => {
		if (appointment.physician_id.toString() === req.query.physId) {
			relevantAppointments.push(appointment)
		}
	});
	res.send(relevantAppointments)
});

app.listen(port, () => console.log(`Notable app listening on port 3000!`))