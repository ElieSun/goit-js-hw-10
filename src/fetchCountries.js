

function fetchCountries(name) {
    const filter= "name,capital,population,flags,languages"
    return fetch(`https://restcountries.com/v3.1/name/${name}/?${filter}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
        })
};

export {fetchCountries};


// BEST FUNCTION Original
// function fetchCountries(name) {
//     fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
//         if (!response.ok) {
//             onError();
//         }

//         return response.json();
//         })
//         .then(data => displayCountryList(data))
//         .catch(err => console.log(err))


//     // return result;
// };


// function fetchCountries(name) {
//     let result = fetch(`https://restcountries.com/v3.1/name/${name}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         return response.json();
//         }).then(data => console.log(data))
//         .catch(err => console.log(err))

//         console.log(result);
//     return result;
// };

