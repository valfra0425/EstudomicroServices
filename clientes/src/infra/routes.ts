import { Router } from "express";
import { CreateClientController } from "../modules/createClient/createClient.controller";

// rotas da aplicação express

const router = Router();

router.post('/client', (request, response) => {
    new CreateClientController().handle(request, response)
});

export { router }