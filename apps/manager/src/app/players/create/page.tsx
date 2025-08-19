import { Header } from '~/components/layout';
import { TipBanner } from '../_components/tip-banner';
import { FormSection } from './form-section';

const Page = () => {
  return (
    <>
      <Header title="선수 생성" arrow />

      <div className="column-between h-full overflow-hidden">
        <FormSection />
        <TipBanner />
      </div>
    </>
  );
};

export default Page;
