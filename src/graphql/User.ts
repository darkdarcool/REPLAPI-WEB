const headers = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'Accept-Encoding': 'gzip, deflate, br',
	'Connection': 'keep-alive',
	'X-Requested-With': 'Repl.it',
	'Referrer': 'https://repl.it',
	'Origin': 'https://repl.it'
};

export default async function getData(username: string) {
	let info = await fetch('https://repl.it/graphql', {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query:
        `{
          userByUsername(username: "${username}") {
            cycles: karma,
            firstName
          }
        }`
		})
	}).then(info => info.json())
	
	// Log the data. Be sure to add '.data.userByUsername' to 'info' so that unneccesary stuff isn't visible
  return info.data.userByUsername
};