import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toTypedSchema } from '@vee-validate/yup';
import { loginSchema } from '@/modules/auth/schemas/login-schema';
import { useAuthStore } from '@/modules/auth/store/use-auth-store';

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
