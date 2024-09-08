import { kafka } from "..";

// arquivo que consumi posts no kafka

export const kafkaConsumer = async (topic: string) => {
    const consumer = kafka.consumer({ groupId: "CLIENT_APP" });

    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    return consumer;
}