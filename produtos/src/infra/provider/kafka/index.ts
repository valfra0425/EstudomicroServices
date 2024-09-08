import { Kafka, logLevel } from 'kafkajs';

// arquivo de conexão do meu kafka

const kafka = new Kafka({
  brokers: ['master-caribou-7860-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'bWFzdGVyLWNhcmlib3UtNzg2MCQJHdW2QAegHDlwS9QqYxBgCLQ2EI0e6zI0yiE',
      password: 'YzFhMjljN2MtMjVhNi00Yjg5LThjNjMtMjQ5M2JlN2Q4ZmY3'
  },
  logLevel: logLevel.ERROR,
});

export { kafka }