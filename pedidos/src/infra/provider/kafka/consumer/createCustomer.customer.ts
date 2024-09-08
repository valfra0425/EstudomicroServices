import { kafkaConsumer } from "./kafka.consumer"
import { prismaClient } from "../../../database/prismaClient"

// tipo do customer
export type customerType = {
    email: string
    id: string,
}

// arquivo que consumi posts de criação de consumer no kafka

export async function createCustomerConsumer() {
    console.log("customer consumer")
    // consumer chamado
    const consumer = await kafkaConsumer("createClient");

    // consumer começa a ouvir as mensagens do provider
    await consumer.run({
        // para cada mensagem não lida pelo grupo do consumer
        eachMessage: async ({ message }) => {
            // transforma em string
            const messageToString = message.value!.toString();
            // transforma em objeto JSON
            const customer: customerType = JSON.parse(messageToString)

            // cria o produto no banco de pedidos
            await prismaClient.customer.create({ data: { externalId: customer.id, email: customer.email } })
        }
    });
}

createCustomerConsumer()