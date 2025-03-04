import * as dotenv from 'dotenv';
const result = dotenv.config({ path: '.env' });
if (result.error) console.error('** .env undefined **');

import * as CircuitBreakerOpossum from "opossum";
import { CircuitBreaker } from './circuit-breaker';

export class App {

  static start(): void {
    const circuitBreaker = CircuitBreaker.create();
    setInterval(() => App.handleCircuitBreaker(circuitBreaker), Number(process.env.TIMEOUT_EACH_REQUEST));
  }

  static async handleCircuitBreaker(breaker: CircuitBreakerOpossum) {
    // to make a request using the circuit breaker
    try {
      const result = await breaker.fire();
      console.log('Response:', result);
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  }

 
}

App.start();



