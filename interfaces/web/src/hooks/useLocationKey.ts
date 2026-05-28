/**
 * useLocationKey — retorna a chave da rota atual.
 * Usado para forçar re-mount de animações whileInView ao navegar entre páginas.
 */

// Libraries
import { useLocation } from 'react-router-dom';

export const useLocationKey = (): string => {
  const location = useLocation();
  return location.pathname;
};
