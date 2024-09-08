import { Request, Response } from "express";
import { UpdateOrderUseCase } from "./updateOrder.usecase"; 

// arquivo com as rotas de criação de pedido

export class UpdateOrderController {
    constructor () {

    }

    async handle(request: Request, response: Response) {
        const updateOrderUseCase = new UpdateOrderUseCase();
        try {
            const result = await updateOrderUseCase.execute(request.body)
            return response.json(result)
        } catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred.";
            return response.status(400).json({ error: errorMessage })
        }
    }
}