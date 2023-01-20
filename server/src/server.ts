import cors from "@fastify/cors";
import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./lib/routes";

const app = Fastify();

//Define quais aplicações poderão consumir os dados dessa api. Podemos definir a url do
//frontend por exemplo http://localhost:8080
//O método recomendado para adicionar middlewares ao fastify é o REGISTER
app.register(cors, {
    //configurações de acesso a api
});

//appRoutes é a função que está sendo exportada no arquivo Routes.ts com as rotas
//que irá consumir a API (arquivo roteador)
app.register(appRoutes);

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server Running...");
});
