// import { renderHook, act } from '@testing-library/react-hooks';
// import { useAuthStore } from '../store';

// describe('useAuthStore', () => {
//   it('should set and get the token', () => {
//     const { result } = renderHook(() => useAuthStore());

//     act(() => {
//       result.current.setToken('fake-token');
//     });

//     expect(result.current.token).toBe('fake-token');
//   });

//   it('should clear the token', () => {
//     const { result } = renderHook(() => useAuthStore());

//     act(() => {
//       result.current.setToken('fake-token');
//       result.current.setToken(null as any);
//     });

//     expect(result.current.token).toBeNull();
//   });
// });
