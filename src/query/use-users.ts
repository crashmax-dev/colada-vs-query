// useVueQuery({
//   staleTime: 0,
//   queryKey: ['users', userId],
//   initialData: () => ({ id: -1, firstname: 'Unknown' }),
//   queryFn: async () => {
//     const req = await fetch(`/api/users/${userId.value}`, {
//       headers: { 'Content-Type': 'applications/json' }
//     })
//     const res = await req.json() as User
//     return res
//   }
// })
