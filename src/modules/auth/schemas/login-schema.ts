import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Formato de correo inválido').required('El correo es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

export type LoginDTO = yup.InferType<typeof loginSchema>;
