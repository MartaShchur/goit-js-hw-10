const url = 'https://api.thecatapi.com/v1';
const api_key = "live_i0tDaOGInqQ26rh7JUwZgUxN2ia9tgGfeQAmLlGg5e4sjZuijJKVoZO121TcrnQ9";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            // console.log(response)

            // if (!response.ok) {
            //     throw new Error(response.statusText);
            // }
            return response.json();
        });
    
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {

            console.log(response)
            // console.log(response, "then")
            // if (!response.ok) {
            //     throw new Error(response.statusText);
            // }
            
            return response.json();
        })
        .catch((err) => {
            // console.log(err, "catch")   
            
        }
    )
};