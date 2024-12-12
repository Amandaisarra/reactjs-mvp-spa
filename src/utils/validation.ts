export const PHONE_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const formatPhoneNumber = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Aplica a máscara (99) 99999-9999
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})?(\d{5})?(\d{4})?/, function (_, ddd, prefix, suffix) {
      if (suffix) return `(${ddd}) ${prefix}-${suffix}`;
      if (prefix) return `(${ddd}) ${prefix}`;
      if (ddd) return `(${ddd}`;
      return '';
    });
  }

  return value;
};
