import { prismaClient } from "../../infra/database/prismaClient"

type createOrderRequest = {
    customerId: string
    items: [{
        productId: string,
        quantity: number
    }],
}


export class CreateOrderUseCase {
    constructor() {

    }

    async execute(data: createOrderRequest) {
        var error = "0";
        for (let element of data.items) {
            let product = await prismaClient.product.findFirst({ where: { id: element.productId } })

            if (!product) {
                console.log("código do produto não encontrado")
                error = "1";
                break
            }
        }


        const consumer = await prismaClient.customer.findFirst({ where: { id: data.customerId } })

        if (!consumer) error = "2";

        if (error == "1") {
            throw new Error("product did not exists")
        } else if (error == "2") {
            throw new Error("cunsomer did not exists")
        }

        const createdOrder = await prismaClient.order.create({
            data: {
                customerId: data.customerId,
                status: "aguardando pagamento",
                orderItems: {
                    createMany: {
                        data: data.items
                    }
                }
            }
        })

        return createdOrder;
    }
}