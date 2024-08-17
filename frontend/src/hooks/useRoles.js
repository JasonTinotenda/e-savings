import { useSelector } from 'react-redux';

export const useRole = () => {
  const { user } = useSelector(state => state.auth);
  return user?.role || 'user'; // Default role to 'user' if not available
};
