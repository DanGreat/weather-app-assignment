# WeatherAppHomework

This project is weather dashboard application that displays detailed weather information i.e city name, temperature and weather condition for multiple cities that you search by.


## Resources

The API service used to fetch weather information is `https://app.tomorrow.io/` which provide realtime weather information of cities
Resource to access weather codes `https://docs.tomorrow.io/reference/data-layers-weather-codes`, API_KEY is included in the environment directory, you can as well register
and get an API_KEY to access the resources


## How to run the application

To start a local development server, run the following commands:

This command help install the necessary dependencies for the project
```bash
npm i
```

This command serves a local development server
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

