import AppLayout from '@/app/AppLayout';
import CertificateList from '@/features/certificateListFeature/components/CertificateList/CertificateList';

const MainPage = () => {
  return (
    <AppLayout>
      <CertificateList />
    </AppLayout>
  );
};

export default MainPage;
