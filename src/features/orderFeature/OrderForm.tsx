import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '@/app/store/store';
import { CertificateData } from '@/types';
import {
  formatPhoneNumber,
  validateEmail,
  validateName,
  validatePhone,
  validatePhoneNumber,
} from '@/utils/orderForm.helper';
import st from './OrderForm.module.css';
import {
  clearErrors,
  setFieldError,
  setFieldValue,
  submitOrder,
} from './OrderSlice';

type TOrderProps = {
  certificateInfo: CertificateData | null;
};

export const OrderForm: React.FC<TOrderProps> = ({ certificateInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, phone, email, errors, loading, success } = useSelector(
    (state: RootState) => state.order,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(clearErrors());
    dispatch(
      setFieldValue({ field: name as 'name' | 'phone' | 'email', value }),
    );

    if (name === 'name') {
      const error = validateName(value);
      dispatch(setFieldError({ field: 'name', error }));
    }

    if (name === 'email') {
      const error = validateEmail(value);
      dispatch(setFieldError({ field: 'email', error }));
    }
  };

  const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);

      dispatch(
        setFieldValue({
          field: name as 'name' | 'phone' | 'email',
          value: formattedValue,
        }),
      );

      const phoneError = validatePhoneNumber(formattedValue);
      if (phoneError) {
        dispatch(
          setFieldError({
            field: 'phone',
            error: phoneError,
          }),
        );
      } else {
        dispatch(setFieldError({ field: 'phone', error: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const nameError = validateName(name || '');
    const phoneError = validatePhone(phone || '');
    const emailError = validateEmail(email || '');

    if (nameError) {
      dispatch(setFieldError({ field: 'name', error: nameError }));
      isValid = false;
    }

    if (phoneError) {
      dispatch(setFieldError({ field: 'phone', error: phoneError }));
      isValid = false;
    }

    if (emailError) {
      dispatch(setFieldError({ field: 'email', error: emailError }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && certificateInfo) {
      const orderData = {
        name: name || '',
        phone: phone || '',
        email: email || '',
        PaymentTypeId: 2,
        UseDelivery: 0,
        IsGift: 0,
        MsgText: '',
        PName: '',
        PPhone: '',
        certificateInfo,
      };

      dispatch(submitOrder(orderData));
      setTimeout(() => {
        navigate('/payment');
      }, 1000);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (success) {
    return <h2>Переходим на страницу оплаты...</h2>;
  }

  return (
    <div className={st.formContainer}>
      <h2>Оформление заказа</h2>
      <form className={st.orderForm} onSubmit={handleSubmit} noValidate>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Введите имя"
            required
          />
          {errors.name && <p className={st.error}>{errors.name}</p>}
        </div>

        <div>
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChangeTelephone}
            placeholder="+7 (___) ___-__-__"
            required
          />
          {errors.phone && <p className={st.error}>{errors.phone}</p>}
        </div>

        <div>
          <label>Почта:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="pochta@mail.ru"
            required
          />
          {errors.email && <p className={st.error}>{errors.email}</p>}
        </div>

        <div>
          <button type="button" onClick={handleBack}>
            Назад
          </button>
          <button type="submit">Оплатить</button>
        </div>
      </form>
    </div>
  );
};
