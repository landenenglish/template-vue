import { type AxiosResponse, isAxiosError } from 'axios'
import { readonly } from 'vue'

export const useRequest = <ResponseType>(
  reqFn: () => Promise<AxiosResponse<ResponseType>>,
  // Options
  { alertError } = {
    alertError: true
  }
) => {
  const status: Ref<'initial' | 'loading' | 'error' | 'success'> = ref('initial')
  const code: Ref<number | null> = ref(null)
  const data: Ref<ResponseType | null> = ref(null)

  const invoke = async (): Promise<AxiosResponse<ResponseType> | unknown> => {
    status.value = 'loading'

    try {
      const response = await reqFn()

      data.value = response.data
      code.value = response.status
      status.value = 'success'

      return response
    } catch (error: unknown) {
      console.error(error)
      status.value = 'error'

      if (isAxiosError(error)) code.value = error?.response?.status ?? null

      if (alertError) window.alert('Something went wrong ' + error)

      return error
    }
  }

  return {
    invoke,
    data: readonly(data),
    code: readonly(code),
    status: readonly(status),
    // Boolean helpers derived from status
    isInitial: computed(() => status.value === 'initial'),
    isLoading: computed(() => status.value === 'loading'),
    isError: computed(() => status.value === 'error'),
    isSuccess: computed(() => status.value === 'success')
  }
}
