# Node circuit breaker using Opossum library
This node application is a super simple circuit breaker example using Opossum library.

### Dependencies
* Docker
* Docker Compose
* NPM
* Node(locally)

### Project dependencies
* opossum
* axios
* dotenv

### Project DEV dependencies
* nodemon
* ts-node


## Variables configurable to test with default values

 ```bash
REQUEST_TIMEOUT=3000 # 3 seconds connection timeout
REQUEST_URL=$(URL_HERE) # request URL
ERROR_THRESHOLD_PERCENTAGE=50 # Open circuit after 50% failures
RESET_TIMEOUT=5000 # Attempt to close circuit after 5 seconds

TIMEOUT_EACH_REQUEST=1000 # Timeout to make requests 
```

## Run project

First of all, install dependencies:

```bash
  npm install
```

To run locally:

```bash
  npm run start:dev
```

To run via docker in dev environment:

```bash
  npm run start:docker
```

## Hands on 

When your API starts to respond requests with a fail status code, and, overtaking the threshold defined to `ERROR_THRESHOLD_PERCENTAGE`, the circuit breaker becomes **OPEN** and stops to make external requests:

```bash
circuit-breaker  | Requesting...
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Requesting...
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Circuit is HALF-OPEN, testing requests.
circuit-breaker  | Requesting...
circuit-breaker  | Circuit is OPEN, blocking requests.
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
```

When reaching out in the timeout limit, configured by the property `RESET_TIMEOUT`, the Circuit changes your state to **HALF-OPEN**. With this state, new requests are made to understand if the circuit needs to be OPEN or CLOSE:

```bash
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Response: { message: 'Fallback: Service unavailable' }
circuit-breaker  | Circuit is HALF-OPEN, testing requests.
circuit-breaker  | Requesting...
circuit-breaker  | Response: ok
circuit-breaker  | Requesting...
circuit-breaker  | Response: ok
circuit-breaker  | Requesting...
circuit-breaker  | Response: ok
```

You can follow the application logs to understand the circuit breaker behaviors.

Too, you can check the circuit stats to view the statistics:

```bash
circuit-breaker  | {
circuit-breaker  |   failures: 1,
circuit-breaker  |   fallbacks: 4,
circuit-breaker  |   successes: 0,
circuit-breaker  |   rejects: 3,
circuit-breaker  |   fires: 4,
circuit-breaker  |   timeouts: 0,
circuit-breaker  |   cacheHits: 0,
circuit-breaker  |   cacheMisses: 0,
circuit-breaker  |   coalesceCacheHits: 0,
circuit-breaker  |   coalesceCacheMisses: 0,
circuit-breaker  |   semaphoreRejections: 0,
circuit-breaker  |   percentiles: {
circuit-breaker  |     '0': 721,
circuit-breaker  |     '1': 721,
circuit-breaker  |     '0.25': 721,
circuit-breaker  |     '0.5': 721,
circuit-breaker  |     '0.75': 721,
circuit-breaker  |     '0.9': 721,
circuit-breaker  |     '0.95': 721,
circuit-breaker  |     '0.99': 721,
circuit-breaker  |     '0.995': 721
circuit-breaker  |   },
circuit-breaker  |   latencyTimes: [ 721 ],
circuit-breaker  |   latencyMean: 721
circuit-breaker  | }
```

### API Mock app to test the behaviors.

Commonly, I work out with the [Webhook site](https://webhook.site/) to create a mock API. It's a great solution to view the requests coming and manipulate the responses. 

## License

This application is available under the
[MIT license](https://opensource.org/licenses/MIT).







  
