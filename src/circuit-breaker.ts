import * as CircuitBreakerOpossum from "opossum";
import axios from 'axios';

export class CircuitBreaker {
  private static options: CircuitBreakerOpossum.Options = {
    timeout: Number(process.env.REQUEST_TIMEOUT),
    errorThresholdPercentage: Number(process.env.ERROR_THRESHOLD_PERCENTAGE),
    resetTimeout: Number(process.env.RESET_TIMEOUT),
  };

  private static async fetchData() {
    try{
      console.log('Requesting...')
      const response = await axios.get(process.env.REQUEST_URL);
      return response.data;
    }catch(e){
      throw e;
    }
  }

  private static showStats(breaker: CircuitBreakerOpossum) {
    setTimeout(() => {
      console.log(breaker.stats)
    }, Number(process.env.RESET_TIMEOUT));
  }

  static create(): CircuitBreakerOpossum {
    const breaker = new CircuitBreakerOpossum(CircuitBreaker.fetchData, CircuitBreaker.options);
    // Event listeners for logging
    breaker.on('open', () => console.log('Circuit is OPEN, blocking requests.'));
    breaker.on('close', () => console.log('Circuit is CLOSED, allowing requests.'));
    breaker.on('halfOpen', () => console.log('Circuit is HALF-OPEN, testing requests.'));
    breaker.on('fallback', () => /*console.log('Circuit is HALF-OPEN, testing requests.')*/ void 0);

    // Define a fallback response in case of failure
    breaker.fallback(() => ({ message: 'Fallback: Service unavailable' }));

    CircuitBreaker.showStats(breaker);

    return breaker;
  } 

 
}