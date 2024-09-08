import { kafkaConsumer } from "./kafka.consumer"
import { prismaClient } from "../../../database/prismaClient"

// tipo do customer
export type customerType = {
    email: string
    id: string,
}

// arquivo que consumi posts de criação de consumer no kafka

export async function createCustomerConsumer() {
    console.log("customer consumer");

    try {
        // consumer chamado
        const consumer = await kafkaConsumer("createClient");

        // consumer começa a ouvir as mensagens do provider
        await consumer.run({
            // para cada mensagem não lida pelo grupo do consumer
            eachMessage: async ({ message }) => {
                try {
                    // transforma em string
                    const messageToString = message.value?.toString();
                    if (!messageToString) {
                        console.error('Mensagem vazia ou inválida recebida.');
                        return;
                    }

                    // transforma em objeto JSON
                    const customer: customerType = JSON.parse(messageToString);

                    // cria o cliente no banco de pedidos
                    const createdCustomer = await prismaClient.customer.create({
                        data: { externalId: customer.id, email: customer.email },
                    });
                    console.log('Cliente criado:', createdCustomer);
                } catch (error) {
                    console.error('Erro ao processar mensagem:', error);
                }
            },
        });
    } catch (error) {
        console.error('Erro no consumer Kafka:', error);
    }
}

createCustomerConsumer()