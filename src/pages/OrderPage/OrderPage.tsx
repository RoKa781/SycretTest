import { useParams } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { RootState, useSelector } from '@/app/store/store';
import { OrderForm } from '@/features/orderFeature/OrderForm';

const OrderPage = () => {
  const { id } = useParams();
  const certificate = useSelector(
    (state: RootState) => state.certificateSlice.certificates,
  ).find((item) => item.ID === id);

  const loading = useSelector(
    (state: RootState) => state.certificateSlice.loading,
  );

  let content;

  if (loading) {
    content = <h2>Loading...</h2>;
  } else if (!certificate) {
    content = <h2>Не найдено</h2>;
  } else {
    content = (
      <>
        <h2>Страница покупки {certificate?.NAME}</h2>
        <OrderForm certificateInfo={certificate || null} />
      </>
    );
  }

  return <AppLayout>{content}</AppLayout>;
};

export default OrderPage;
