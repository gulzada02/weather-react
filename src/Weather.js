import React, {Component} from 'react';
import WeatherDetails from './WeatherDetails';
import Preview from './Preview';


class Weather extends Component{
    state ={
        data:null,
        city: "",
        error: false,
        loader:false
    };
    apiKey = 'ff4b7d60c81abc0b589f8ecc30cf79ca';
    weatherIcon='13d.png';

  
    getWeather=(event)=>{
        event.preventDefault();
        let city=this.state.city;
        this.setState({
            loader:true
        }, ()=>{
            
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod===200){
                        this.setState({
                            data:data,
                            loader:false
                        })} else (
                            this.setState({error:true})
                        )
                })
            
        });

    };

    handleChange=(event)=>{
        this.setState({city:event.target.value})
    };

    render (){
        let weatherContent= <Preview />
        if (this.state.loader){
            weatherContent= <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>;
        }else if (this.state.data && this.state.data.cod===200){
            weatherContent=<WeatherDetails data={this.state.data} />
        }

        return (
            <div className="container app">
                <form 
                className="search-box"
                onSubmit={this.getWeather}>
                    <input 
                    className="search-bar"
                    type="text" 
                    placeholder="Enter city name"
                    onChange={this.handleChange}
                    />
                    <button>Get</button>
                    <div className="weather-box">
                        <div className="temp">
                        {weatherContent}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Weather;

