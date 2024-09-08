import { Kafka, logLevel } from 'kafkajs';
import * as dotenv from 'dotenv';
dotenv.config();

// arquivo de conexão do meu kafka

const broker = process.env.KAFKA_BROKER || "";
const username = process.env.KAFKA_USERNAME || "";
const password = process.env.KAFKA_PASSWORD || "";

const kafka = new Kafka({
  brokers: [broker],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: username,
      password: password
  },
  logLevel: logLevel.ERROR,
});

export { kafka }