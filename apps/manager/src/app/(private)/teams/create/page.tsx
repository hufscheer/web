import { Header } from '~/components/layout';
import { FormSection } from './form-section';

const Page = () => {
  return (
    <>
      <Header title="참가 팀 생성" arrow />

      <div className="column-between h-full overflow-hidden p-6">
        <FormSection />
      </div>
    </>
  );
};

export default Page;
