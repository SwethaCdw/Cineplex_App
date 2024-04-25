
export const getShortTeasers = await fetch('/resources/shortTeasers.json')
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));