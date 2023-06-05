from flask import Flask, render_template, request
import requests, datetime, os
from dotenv import load_dotenv

load_dotenv()
Api_key = os.getenv('API_KEY')


app = Flask(__name__)


def get_location(city):
    """returns the location of the argument passed"""
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={Api_key}"
    response = requests.get(url)
    return response.json()

def get_future_forecast(location):
    """"returns the next 5 days weather forecast"""
    lat, lon = [location[0]["lat"], location[0]["lon"]]
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={Api_key}"
    response = requests.get(url)
    forecast = response.json()
    days = set()
    mini_temp = {}
    maxi_temp = {}
    for item in range(0, len(forecast["list"])):
        time = datetime.datetime.fromtimestamp(forecast["list"][item]["dt"])
        current_day = time.strftime("%A")
        days.add(current_day)
        
        min_temp = forecast["list"][item]["main"]["temp_min"]
        max_temp = forecast["list"][item]["main"]["temp_max"]

        if current_day not in maxi_temp or max_temp > maxi_temp[current_day]:
            maxi_temp[current_day] = max_temp
        if current_day not in mini_temp or min_temp < mini_temp[current_day]:
            mini_temp[current_day] = min_temp
    def custom_sort_key(day):
        order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return order.index(day)

    day = sorted(days, key=custom_sort_key)
    temp = [mini_temp, maxi_temp]
    #print(temp, day)
    return(forecast, temp, day)
    

def get_current_weather(location):
    """returns the current weather forecast"""
    lat, lon = [location[0]["lat"], location[0]["lon"]]
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={Api_key}"
    response = requests.get(url)
    weather = response.json()
    time = datetime.datetime.fromtimestamp(weather["dt"])
    time_format = time.strftime("%A, %b %d, at %I:%M%p ")
    return weather, time_format 


@app.errorhandler(Exception)
def error_page(error):
    return "<h1> City not found, Enter a valid city</h1>", 500


@app.route("/")
def index():
    """the homepage of the website"""
    city = request.args.get('city')
    location = get_location(city)
    weather, time_format = get_current_weather(location)
    forecast, temp, day = get_future_forecast(location)
    return render_template('index.html', weather=weather, location=location, time=time_format, forecast=forecast, day=day, temp=temp)

if __name__ == '__main__':
    app.run(debug=True)
    #location = get_location("lagos")
    #get_future_forecast(location)