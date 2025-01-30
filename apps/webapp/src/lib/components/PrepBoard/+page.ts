import { api } from '@ckm/lib-api'
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: ['prepboard'],
    queryFn: async () => {
      const res = await api.prepBoard.getPrepBoards();
      if (res.status === 200) {
        return res.body
      }
      throw error(res.status, `Failed to retrieve the prepBoards`)
    }
  })

  return {
    prepBoards: queryClient.getQueryData(['prepBoards'])
  }
}
