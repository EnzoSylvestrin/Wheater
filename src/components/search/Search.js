import './Search.css';
import { useState } from 'react';

export default function Search() {

    const [cidade, setCidade] = useState("");
    
    function SearchInput(e) {
        e.preventDefault();
        let currentValue = document.querySelector('input[name="search"]').value;
        const apiKey = "4d8fb5b93d4af21d66a2948710284366"; //Use as much as you want 😺 
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + currentValue + "&appid=" + apiKey + "&units=metric";
        fetch(url).then(response => response.json()).then(data => {
            const {main, name, sys, weather} = data;
            if (weather !== undefined) {
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
                let sunset = "";
                let sunrise = "";
                let date = new Date(sys.sunset * 1000);
                sunset += date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
                date = new Date(sys.sunrise * 1000);
                sunrise += date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
                setCidade(`
                    <div class="result-title">
                        <h1> ${name} </h1>
                        <img src="${icon}" alt="weather icon" />
                    </div>
                    <div class="result-props">
                        <div class="props">País: ${sys.country}</div>
                        <div class="props">Descrição: ${weather[0].description}</div>
                        <div class="props">Pôr do sol: ${sunrise}</div>
                        <div class="props">Nascer do sol: ${sunset}</div>
                        <div class="props">Temperatura: ${main.temp} °C</div>
                        <div class="props">Temperatura máxima: ${main.temp_max} °C</div>
                        <div class="props">Temperatura mínima: ${main.temp_min} °C</div>
                        <div class="props">pressão: ${main.pressure} hPa</div>
                    </div>
                `)
                if (weather[0].main === "Clouds" || weather[0].main === "Mist") {
                    document.body.style.setProperty('--bgColorLinear', "linear-gradient(to top, #080808, #525243)")
                }
                else {
                    document.body.style.setProperty('--bgColorLinear', "linear-gradient(to top, #ff7300, #d8ca0a)");
                }
                console.log(weather[0].main);
            }
        });
    }

    return (
        <div className="searchWrapper">
            <div className="search">
                <h2>Digite o nome da cidade:</h2>
                <form onSubmit={(e) => SearchInput(e)}>
                    <input type="text" placeholder="Digite a cidade..." name="search" />
                    <input type="submit" value="Pesquisar" /> 
                </form>
            </div>
            {
                (cidade !== "") ? <div className='result' dangerouslySetInnerHTML={{__html: cidade}} /> : <div style={{padding: "8px"}}>Pesquise por alguma cidade...</div>
            }
        </div>
    );
}