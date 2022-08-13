import type { NextPage } from 'next';

import Meta from '@/components/Meta';
import Main from '@/layouts/Main';

interface Props {}

const Index: NextPage<Props> = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="mx-auto mb-6 max-w-site px-6 desktop:px-16">
        <h1>NextJS Project Boilerplate</h1>
      </div>
    </Main>
  );
};

export default Index;
