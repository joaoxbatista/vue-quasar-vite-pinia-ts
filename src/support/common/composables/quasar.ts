import { QDialogOptions, useQuasar } from 'quasar'
export const useConfirm = ({
  config,
  func,
}: {
  config: QDialogOptions
  func: () => Promise<void>
}) => {
  const $q = useQuasar()

  return () =>
    $q
      .dialog({
        ...config,
        ok: {
          push: true,
          color: 'primary',
          label: 'Sim',
        },
        cancel: {
          push: true,
          color: 'dark',
          label: 'Não',
        },
      })
      .onOk(func)
}
