export const getMovies = (count) => {
    return fetch('/resources/movies.json')
        .then(response => response.json())
        .then(data => {
            const slicedData = data.slice(0, count); // Get specified number of entries
            return { movies: slicedData, totalLength: data.length };
        })
        .catch(error => console.error('Error reading JSON file:', error));
};