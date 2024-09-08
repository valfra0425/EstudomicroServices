import { Request, Response } from "express";
import { CreateProductUseCase } from "./createProduct.usecase"

// arquivo com as rotas de criação de product

export class createProductController {
    constructor() {

    }

    async handle(request: Request, response: Response) {
        const createProductUseCase = new CreateProductUseCase();
        try {
            const result = await createProductUseCase.execute(request.body);
            return response.json(result);
        }
        catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred.";
            return response.status(400).json({ error: errorMessage });
        }
    }
}