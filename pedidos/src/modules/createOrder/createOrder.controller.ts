import { Request, Response } from "express";
import { CreateOrderUseCase } from "./createOrder.usecase";

// arquivo com as rotas de criação de pedido

export class CreateOrderController {
    constructor () {

    }

    async handle(request: Request, response: Response) {
        const createOrderUseCase = new CreateOrderUseCase();
        try {
            const result = await createOrderUseCase.execute(request.body)
            return response.json(result)
        } catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred.";
            return response.status(400).json({ error: errorMessage })
        }
    }
}