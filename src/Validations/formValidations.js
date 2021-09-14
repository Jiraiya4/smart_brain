import * as yup from 'yup';

export const signInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(25).required()
});

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(25).required()
})