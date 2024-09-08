import { Request, Response } from "express";
import { CreateClientUseCase } from "./createClient.usecase";

// arquivo com as rotas de criação de client

export class CreateClientController {
    constructor() {

    }

    async handle(request: Request, response: Response) {
        const createClientUseCase = new CreateClientUseCase();
        try {
            const result = await createClientUseCase.execute(request.body)
            return response.json(result)
        } catch (err: any) {
            const errorMessage = err.message || "An unexpected error occurred.";
            return response.status(400).json({ error: errorMessage })
        }
    }
}