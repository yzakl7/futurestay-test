import Axios from "axios";

const apiKey = 'f5ec3657e1164191cc30775f0f174366';

const getWeather = (city) => {
  return Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(({data}) => {
      return data;
    }
  ).catch(() => {
    return({error: 'No hay datos para la ciudad introducida'})
  })
}

export default getWeather;
