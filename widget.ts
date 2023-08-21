interface Recommendation {
	id: number;
	title: string;
	description: string;
}

function fetchJsonp(url: string, callbackName: string): Promise<Recommendation[]> {
	return new Promise((resolve) => {
		window[callbackName] = (response: Recommendation[]) => {
			resolve(response);
			delete window[callbackName];
		};

		const script = document.createElement('script');
		script.src = `${url}?callback=${callbackName}`;
		document.body.appendChild(script);
	})
}

const callbackName = 'callback';
const url = 'http://localhost:3000/recommendations';
(async () => {
	await new Promise(resolve => setTimeout(resolve, 1500));
	try {
		const data: Recommendation[] = await fetchJsonp(url, callbackName);
		data.forEach((item) => {
			const div = document.createElement('div');
			div.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
			document.body.appendChild(div);
		});
	} catch (error) {
		console.error(error);
	}
})();
