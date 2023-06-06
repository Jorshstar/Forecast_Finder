window.addEventListener('DOMContentLoaded', function() {
  // Add event listener to detect window resize
  window.addEventListener('resize', function() {
    // Code for responsive behavior
    // Adjust elements and styles based on screen size
    // ...
  });

  // Get user's location and update the location element
  function getUserLocation() {
    // Logic to retrieve user's location
    // ...

    // Example: Setting user's location to Lagos, Nigeria
    var userLocation = "Lagos, Nigeria";
    var locationElement = document.querySelector('.forecast__city');
    locationElement.textContent = userLocation;
  }

  // Update temperature unit when Fahrenheit or Celsius is clicked
  function updateTemperatureUnit() {
    var temperatureUnitElement = document.querySelector('.degrees');
    var celsiusButton = temperatureUnitElement.querySelector('.celsius-button');
    var fahrenheitButton = temperatureUnitElement.querySelector('.fahrenheit-button');
    var temperatureElement = document.querySelector('.forecast__temperature');

    celsiusButton.addEventListener('click', function() {
      // Code to switch to Celsius
      // ...
      temperatureElement.textContent = '18°C'; // Example temperature in Celsius
    });

    fahrenheitButton.addEventListener('click', function() {
      // Code to switch to Fahrenheit
      // ...
      temperatureElement.textContent = '64°F'; // Example temperature in Fahrenheit
    });
  }

  // Get weather condition based on the selected day
  function getWeatherCondition(day) {
    // Logic to fetch weather condition based on the selected day
    // ...

    // Example: Setting weather condition to Sunny
    var weatherCondition = 'Sunny';

    return weatherCondition;
  }

  // Update weather condition based on the selected day
  function updateWeatherCondition(day) {
    var forecastElement = document.querySelector('.forecast');

    // Get the weather condition for the selected day
    var weatherCondition = getWeatherCondition(day);

    // Update the forecast element with the weather condition
    forecastElement.textContent = weatherCondition;
  }

  // Add event listener to each card element
  var cardElements = document.querySelectorAll('.card');
  cardElements.forEach(function(card) {
    card.addEventListener('click', function() {
      var selectedDay = this.getAttribute('data-day');
      updateWeatherCondition(selectedDay);
    });
  });

  // Call the necessary functions
  getUserLocation();
  updateTemperatureUnit();
});

