import type { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

interface Props {
  meta: ReactNode;
  children: ReactNode;
}

const Main: React.FC<Props> = (props) => (
  <div className="w-full font-jetbrains text-gray-700 antialiased">
    {props.meta}

    <Navbar />

    <main>{props.children}</main>

    {/* <Footer /> */}
  </div>
);

export default Main;
