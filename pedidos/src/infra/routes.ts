import { Router } from "express";
import { CreateOrderController } from "../modules/createOrder/createOrder.controller"; 
import { UpdateOrderController } from "../modules/updateOrder/updateOrder.controller"

// rotas da aplicação express

const router = Router();

router.post('/order', (request, response) => {
    new CreateOrderController().handle(request, response)
});

router.patch('/order', (request, response) => {
    new UpdateOrderController().handle(request, response)
});

export { router }