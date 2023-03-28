const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonsDetails) {
  const pokemon = new Pokemon
  
  pokemon.name = pokemonsDetails.name
  pokemon.number = pokemonsDetails.order

  const types = pokemonsDetails.types.map(typeSlot => typeSlot.type.name)
  const [ type ] = types

  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokemonsDetails.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getpokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json)
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10 ) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results)
    .then(pokemons => pokemons.map(pokeApi.getpokemonDetail))
}