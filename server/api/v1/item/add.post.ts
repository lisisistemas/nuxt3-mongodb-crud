import { Error } from 'mongoose';
import todoModel from '~/server/models/todo.model';
import { ITodo } from '~/types';

export default defineEventHandler(async (event) => {
    try {
        const body: ITodo = await readBody(event)
        if (!body) {
            return setResponse(event, { statusCode: 400, statusMessage: 'O campo item é obrigatório.' })
        }
        await todoModel.create({ item: body.item })
        return setResponse(event, { statusCode: 200, statusMessage: 'Novo item adicionado.' })
    } catch (error: unknown) {
        if (error instanceof Error.ValidationError) {
            return setResponse(event, { statusCode: 400, statusMessage: error.message })
        }
        return setResponse(event, { statusCode: 500, statusMessage: 'Algo saiu errado.' })
    }
})