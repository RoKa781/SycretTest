import { RootState, useSelector } from '@/app/store/store';
import CertificateArticle from '../CertificateArticle/CertificateArticle';
import st from './CertificateList.module.css';

const CertificateList = () => {
  const { certificates, loading, error } = useSelector(
    (state: RootState) => state.certificateSlice,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={st.listContainer}>
      <ul className={st.gamesList}>
        {certificates.map((certificate) => (
          <CertificateArticle key={certificate.ID} item={certificate} />
        ))}
      </ul>
    </div>
  );
};

export default CertificateList;
