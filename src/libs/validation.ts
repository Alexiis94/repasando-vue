import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

export const setupValidation = () => {
  configure({
    generateMessage: localize('es'),
    bails: false,
  });
};
