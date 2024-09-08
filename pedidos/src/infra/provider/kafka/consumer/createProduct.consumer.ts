import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "./kafka.consumer";

// tipo do product
export type productType = {
    externalId: string
    code: string,
}

// arquivo que consumi posts de criação de consumer no kafka

export async function createProductConsumer() {
    console.log("product consumer")
    // consumer chamado
    const consumer = await kafkaConsumer("createProduct");

    // consumer começa a ouvir as mensagens do provider
    await consumer.run({
        // para cada mensagem não lida pelo grupo do consumer
        eachMessage: async ({ message }) => {
            // transforma em string
            const messageToString = message.value!.toString();
            // transforma em objeto JSON
            const customer: productType = JSON.parse(messageToString)

            // cria o produto no banco de pedidos
            await prismaClient.product.create({ data: { externalId: customer.externalId, code: customer.code } })
        },
    });
}

createProductConsumer()