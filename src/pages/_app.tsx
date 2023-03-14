import '../styles/global.css';

import type { AppProps } from 'next/app';

import { ConfigContext } from '@/context/ConfigContext';
import type Config from '@/interfaces/Config';

const DefaultConfig: Config = { showAtc: false, showBoundaries: false };

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigContext.Provider value={DefaultConfig}>
      <Component {...pageProps} />
    </ConfigContext.Provider>
  );
};

export default MyApp;
