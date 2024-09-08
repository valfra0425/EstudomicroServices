import { kafkaConsumer } from "./kafka.consumer"

// esse arquivo vai simular uma api de notificação

// tipo do status
export type notificationType = {
    customerId: string
    status: string,
}

// arquivo que consumi posts de criação de consumer no kafka

export async function statusConsumer() {
    console.log("status consumer")
    // consumer chamado
    const consumer = await kafkaConsumer("orderStatus");

    // consumer começa a ouvir as mensagens do provider
    await consumer.run({
        // para cada mensagem não lida pelo grupo do consumer
        eachMessage: async ({ message }) => {
            // transforma em string
            const messageToString = message.value!.toString();
            // transforma em objeto JSON
            const status: notificationType = JSON.parse(messageToString)

            console.log(`o pedido do usuário ${status.customerId} foi atualizado para ${status.status}`)
        }
    });
}

statusConsumer()