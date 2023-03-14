import { createContext } from 'react';

import type Config from '@/interfaces/Config';

export const ConfigContext = createContext<Config | null>(null);
