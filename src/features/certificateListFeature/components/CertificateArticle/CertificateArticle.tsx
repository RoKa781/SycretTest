import { Link } from 'react-router-dom';
import NoImage from '@/components/NoImage/NoImage';
import { CertificateData } from '@/types';
import st from './CertificateArticle.module.css';

interface CertificateArticleProps {
  item: CertificateData;
}

const CertificateArticle: React.FC<CertificateArticleProps> = ({ item }) => {
  return (
    <li className={st.certificateItem}>
      <article className={st.certificateArticle}>
        <Link className={st.orderLink} to={`/order/${item.ID}`}>
          Оформить
        </Link>
        {item.IMAGEURL ? (
          <img
            src={item.IMAGEURL}
            alt={item.NAME}
            className={st.certificateImage}
          />
        ) : (
          <NoImage />
        )}
        <div className={st.infoContainer}>
          <h3 className={st.certificateTitle}>{item.NAME}</h3>
          {item.DESCRIPTION && (
            <p className={st.certificateDescription}>{item.DESCRIPTION}</p>
          )}
          <div className={st.certificatePrice}>
            <span className={st.price}>Цена: {item.SUMMA} ₽</span>
            {item.DISCOUNT && (
              <span className={st.discount}>Скидка: {item.DISCOUNT}%</span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default CertificateArticle;
