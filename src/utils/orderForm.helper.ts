export const formatPhoneNumber = (value: string): string => {
  let formattedValue = value.replace(/\D/g, '');

  if (!formattedValue.startsWith('7')) {
    formattedValue = '7' + formattedValue;
  }

  if (formattedValue.length <= 1) {
    return '+7';
  } else if (formattedValue.length <= 4) {
    return `+7 (${formattedValue.slice(1)}`;
  } else if (formattedValue.length <= 7) {
    return `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4)}`;
  } else if (formattedValue.length <= 9) {
    return `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4, 7)} - ${formattedValue.slice(7)}`;
  } else {
    return `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4, 7)} - ${formattedValue.slice(7, 9)} - ${formattedValue.slice(9, 11)}`;
  }
};

export const validatePhoneNumber = (value: string): string | null => {
  const cleanedValue = value.replace(/\D/g, '').slice(1, 11);

  if (!value) {
    return 'Телефон обязателен';
  } else if (cleanedValue.length < 10) {
    return 'Телефон должен быть не менее 11 символов';
  }
  return null;
};

export const validateName = (name: string) => {
  if (!name) return 'Имя обязательно';
  if (name.length < 3) return 'Имя должно быть не менее 3 символов';
  if (/\d/.test(name)) return 'Имя не должно содержать цифры';
  return '';
};

export const validateEmail = (email: string) => {
  if (!email) return 'Почта обязательна';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Неверный формат почты';
  return '';
};

export const validatePhone = (phone: string) => {
  if (!phone || phone.replace(/\D/g, '').slice(1, 11).length < 10) {
    return 'Неверный формат телефона';
  }
  return '';
};
