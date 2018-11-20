// would have split this file up into 3 parts
// 1. http requests
// 2. core script logic
// 3. Dom Utils

function getPhysicians() {
	return fetch('http://localhost:3000/physicians').then(resp => resp.json());
}

const DomUtils = {
	// creates each appointment item
	makeListEl: ({lastName, firstName, time, type}, elIdx) => {
		const ul = document.createElement('ul');
		const liId = document.createElement('li');
		const liName = document.createElement('name');
		const liTime = document.createElement('time');
		const liType = document.createElement('type');
		
		ul.id = 'appointment-slot'
		DomUtils.styleUl(ul)
		liName.textContent = lastName + ', ' + firstName;
		liId.textContent = elIdx + 1;
		liTime.textContent = time;
		liType.textContent = type;

		ul.appendChild(liId);
		ul.appendChild(liName);
		ul.appendChild(liTime);
		ul.appendChild(liType);

		return ul;		
	},

	styleUl: (ul) => {
		ul.style.display = 'flex';
		ul.style['justify-content'] = 'space-evenly';
	},
	// ties a click event to a GET request for relevant appointments
	setClickHandler: (el) => {
		el.addEventListener('click', (event) => {
			const physId = event.currentTarget.getAttribute('physician-id');
			DomUtils.resetAppointments();

			fetch('http://localhost:3000/appointments?physId=' + physId).then(resp => resp.json())
			.then(appointments => {
				appointments.forEach((appointment, elIdx) => {
					document.querySelector('#physician-appointments').appendChild(
						DomUtils.makeListEl(appointment, elIdx))
				});
			});
		});
	},

	resetAppointments: () => {
		if (document.querySelector('#appointment-slot')) {
			document.querySelectorAll('#appointment-slot').forEach(appointmentEl => {
				appointmentEl.remove();
			});	
		};
	}
};

// initiates the script, populates physicians, and ties click handler
getPhysicians().then(physicians => {
	const physicianDiv = document.querySelector('#physicians');

	physicians.forEach(physician => {
		const button = document.createElement('button');

		button.setAttribute('physician-id', physician.id);
		button.textContent = physician.lastName + ', ' + physician.firstName;
		physicianDiv.appendChild(button);
		DomUtils.setClickHandler(button);
	})
})

