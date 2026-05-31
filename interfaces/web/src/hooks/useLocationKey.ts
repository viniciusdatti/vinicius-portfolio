// Libraries
import { useLocation } from 'react-router-dom';

export const useLocationKey = (): string => {
  const location = useLocation();
  return location.pathname;
};
