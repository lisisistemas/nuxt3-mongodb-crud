import mongoose from 'mongoose';
import { ITodo } from '~/types';

const schema = new mongoose.Schema<ITodo>({
    item: {
        type: String,
        required: [true, 'O campo item é obrigatório.'],
        trim: true,
        // No special characters are allowed. (upper and lower case), spaces, punctuation marks, and numbers only.
        validate: {
            validator: function (v: string) {
                return /^[a-zA-ZÀ-ÿ0-9\s]+$/.test(v)
            },
            message: 'Caracteres especiais não são permitidos, mas assentos são permitidos.'
        },
        maxlength: [50, 'Número máximo de caracteres permitido é 50.']
    }
}, { timestamps: true })

export default mongoose.model<ITodo>('Todo', schema)