// Core
import { useEffect, useState } from 'react';

// Components
import { getSystemHealthUrl } from '../utils/systemHealthUrl';

export enum SystemHealthStatus {
  Checking = 'checking',
  Online = 'online',
  Offline = 'offline',
}

interface SystemHealthState {
  status: SystemHealthStatus;
  version: string | null;
}

const initialState: SystemHealthState = {
  status: SystemHealthStatus.Checking,
  version: null,
};

interface HealthPayload {
  status?: string;
  version?: string;
}

/**
 * Polls backend /health for operational status in the system chrome.
 */
export const useSystemHealth = (): SystemHealthState => {
  const [state, setState] = useState<SystemHealthState>(initialState);

  useEffect(() => {
    let cancelled: boolean = false;

    const fetchHealth = async (): Promise<void> => {
      try {
        const response: Response = await fetch(getSystemHealthUrl());
        if (!response.ok) {
          throw new Error('health unreachable');
        }
        const data: HealthPayload = (await response.json()) as HealthPayload;
        if (cancelled) {
          return;
        }
        setState({
          status:
            data.status === 'healthy'
              ? SystemHealthStatus.Online
              : SystemHealthStatus.Offline,
          version: typeof data.version === 'string' ? data.version : null,
        });
      } catch {
        if (!cancelled) {
          setState({
            status: SystemHealthStatus.Offline,
            version: null,
          });
        }
      }
    };

    void fetchHealth();
    const intervalId: ReturnType<typeof setInterval> = setInterval(
      fetchHealth,
      30000
    );

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return state;
};
