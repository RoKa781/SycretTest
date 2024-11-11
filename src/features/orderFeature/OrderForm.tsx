import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '@/app/store/store';
import { CertificateData } from '@/types';
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

const OrderForm: React.FC<TOrderProps> = ({ certificateInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, phone, email, errors } = useSelector(
    (state: RootState) => state.order,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(clearErrors());

    dispatch(
      setFieldValue({ field: name as 'name' | 'phone' | 'email', value }),
    );

    if (name === 'name') {
      if (!value) {
        dispatch(setFieldError({ field: 'name', error: 'Имя обязательно' }));
      } else if (value.length < 3) {
        dispatch(
          setFieldError({
            field: 'name',
            error: 'Имя должно быть не менее 3 символов',
          }),
        );
      } else if (/\d/.test(value)) {
        dispatch(
          setFieldError({
            field: 'name',
            error: 'Имя не должно содержать цифры',
          }),
        );
      } else {
        dispatch(setFieldError({ field: 'name', error: '' }));
      }
    }

    if (name === 'email') {
      if (!value) {
        dispatch(setFieldError({ field: 'email', error: 'Почта обязательна' }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        dispatch(
          setFieldError({ field: 'email', error: 'Неверный формат почты' }),
        );
      } else {
        dispatch(setFieldError({ field: 'email', error: '' }));
      }
    }
  };

  const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(clearErrors());

    let formattedValue = value.replace(/\D/g, '');

    if (name === 'phone') {
      if (!formattedValue.startsWith('7')) {
        formattedValue = '7' + formattedValue;
      }

      if (formattedValue.length <= 1) {
        formattedValue = '+7';
      } else if (formattedValue.length <= 4) {
        formattedValue = `+7 (${formattedValue.slice(1)}`;
      } else if (formattedValue.length <= 7) {
        formattedValue = `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4)}`;
      } else if (formattedValue.length <= 9) {
        formattedValue = `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4, 7)} - ${formattedValue.slice(7)}`;
      } else {
        formattedValue = `+7 (${formattedValue.slice(1, 4)}) ${formattedValue.slice(4, 7)} - ${formattedValue.slice(7, 9)} - ${formattedValue.slice(9, 11)}`;
      }
    }

    dispatch(
      setFieldValue({
        field: name as 'name' | 'phone' | 'email',
        value: formattedValue,
      }),
    );

    if (name === 'phone') {
      if (!formattedValue) {
        dispatch(
          setFieldError({ field: 'phone', error: 'Телефон обязателен' }),
        );
      } else if (formattedValue.replace(/\D/g, '').slice(1, 11).length < 10) {
        dispatch(
          setFieldError({
            field: 'phone',
            error: 'Телефон должен быть не менее 11 символов',
          }),
        );
      } else {
        dispatch(setFieldError({ field: 'phone', error: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!name) {
      dispatch(setFieldError({ field: 'name', error: 'Имя обязательно' }));
      isValid = false;
    } else if (name.length < 3) {
      dispatch(
        setFieldError({
          field: 'name',
          error: 'Имя должно быть не менее 3 символов',
        }),
      );
      isValid = false;
    } else if (/\d/.test(name)) {
      dispatch(
        setFieldError({
          field: 'name',
          error: 'Имя не должно содержать цифры',
        }),
      );
      isValid = false;
    }

    if (!phone || phone?.replace(/\D/g, '').slice(1, 11).length < 10) {
      dispatch(
        setFieldError({ field: 'phone', error: 'Неверный формат телефона' }),
      );
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      dispatch(
        setFieldError({ field: 'email', error: 'Неверный формат почты' }),
      );
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
      navigate('/payment');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

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

export default OrderForm;
