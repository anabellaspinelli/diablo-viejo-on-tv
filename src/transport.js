export const getAirTimes = () =>
  fetch(
    'https://raw.githubusercontent.com/anabellaspinelli/incaa-tv-movie-times/master/airtimes.json',
  )
    .then(res => res.json())
    .catch(error => console.error(error))
