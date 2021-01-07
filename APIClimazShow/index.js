document.addEventListener('DOMContentLoaded', (e) => {

  const formulario = document.querySelector('#formulario')

  formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value
    e.target.reset()

    if(validar(ciudad, pais)){
      enviarDatos(ciudad, pais)
    }
  })

})

const validar = (city, country) =>{
  if(city === '' || country === '' || country === 'Seleccione un pais de la lista'){
    alert('No pueden haber campos vacíos')
    return null
  }else if(!isNaN(city) || !isNaN(country)){
    alert('Debe agregar una ciudad valida')
  }else{
    return true
    // enviarDatos()
  }
}

const enviarDatos = async (city, country) => {

  const contiene_mostrar = document.querySelector('#resultado')
  const error = document.querySelector('#error')

  const appKey = '55e2e096a80d91b5052fb63f9488dab3'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${appKey}`

  const respuesta = await fetch(url)
  const resultado = await respuesta.json()

  console.log(typeof(resultado))

  if(resultado != ''){
     // kelvin = (celsius) -273.15
    const kelvin = 273.15

    // pasamos a numero entero
    let temperatura = parseInt(resultado.main.temp, 10) - kelvin
    let tem = temperatura.toFixed(2)

    let temp_max = parseInt(resultado.main.temp_max, 10) - kelvin
    let max = temp_max.toFixed(2)

    let temp_min = parseInt(resultado.main.temp_min, 10) - kelvin
    let min = temp_min.toFixed(2)

    contiene_mostrar.style.display = 'block'
    contiene_mostrar.innerHTML= ''
    contiene_mostrar.innerHTML += `<h1>${resultado.name}</h1>
    <img src="cloud.svg" class="nube" salt="nube">
    <p><b>Temperatura Promedio:</b> ${tem} <b>&#176C</b></p>
    <p><b>Temperatura Máxima:</b> ${max} <b>&#176C</b></p>
    <p><b>Temperatura Minima:</b> ${min} <b>&#176C</b></p>`

  }else{
    error.style.display = 'block'
  }

  // Lo que esta dentro del resultado.main
  // feels_like: 272.26
  // ​​
  // humidity: 64
  // ​​
  // pressure: 1013
  // ​​
  // temp: 276.45
  // ​​
  // temp_max: 277.15
  // ​​
  // temp_min: 275.15
}
