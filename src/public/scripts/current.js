
const button = document.getElementById('btnSubmit')

button.addEventListener('click', (e) => {
  e.preventDefault()

	fetch('/api/current', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
		},
	
		
	})

	

	location.href = 'http://localhost:8080/logout'

})
