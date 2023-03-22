import '../styles/global.css';

import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import type Config from '@/interfaces/Config';

const MyApp = ({ Component, pageProps }: AppProps) => {
  let config: Config = { showAtc: false, showBoundaries: false };

  useEffect(() => {
    config = {
      showAtc: getCookie('showAtc') ?? false,
      showBoundaries: getCookie('showBoundaries') ?? false,
    };
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      <Component {...pageProps} />
    </ConfigContext.Provider>
  );
};

export default MyApp;
