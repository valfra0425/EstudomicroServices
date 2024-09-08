import { kafka } from ".";

// arquivo de produção de tópico no kafka

export class kafkaSendMenssager {
    async execute(topic: string, payload: any): Promise<void>{
        const producer = kafka.producer();

        await producer.connect();
        console.log(`MENSAGE SEND TO TOPIC ${topic}`);
        await producer.send({
            topic: topic,
            messages: [{
                value: JSON.stringify(payload)
            }]
        });

        await producer.disconnect();
    }
}