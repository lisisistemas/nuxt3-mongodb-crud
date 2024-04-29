import todoModel from '~/server/models/todo.model';

export default defineEventHandler(async (event) => {
    try {
        await todoModel.findByIdAndDelete(event.context.params!.id)
        return setResponse(event, { statusCode: 200, statusMessage: 'Item apagado com sucesso.' })
    } catch (error) {
        return setResponse(event, { statusCode: 500, statusMessage: 'Algo saiu errado.' })
    }
})