import { prismaClient } from "../../infra/database/prismaClient"
import { kafkaSendMenssager } from "../../infra/provider/kafka/producer";

type updateOrderRequest = {
    id: string,
    status: string
}

export class UpdateOrderUseCase {
    constructor() {

    }

    async execute(data: updateOrderRequest) {
        const updateOrder = await prismaClient.order.update({ data: { status: data.status }, where: { id: data.id } });

        const externalId = await prismaClient.customer.findFirst({ where: { id: updateOrder.customerId}, select: {externalId: true}})
        console.log(externalId)

        const kafkaProducer = new kafkaSendMenssager();
        kafkaProducer.execute("orderStatus", { customerId: externalId?.externalId, status: updateOrder.status })

        return updateOrder;
    }
}