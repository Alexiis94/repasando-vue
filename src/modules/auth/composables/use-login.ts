import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { loginSchema } from '../schemas/login-schema';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/use-auth-store';

const useLogin = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const { errors, defineField, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
    validationSchema: toTypedSchema(loginSchema),
  });

  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');

  const onSubmit = handleSubmit(async (values) => {
    try {
      await authStore.login(values);
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  });

  return {
    errors,
    email,
    emailAttrs,
    password,
    passwordAttrs,
    isSubmitting,
    onSubmit,
  };
};

export default useLogin;
