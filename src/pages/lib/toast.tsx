import {Group, Button} from '@mantine/core'
import {showNotification} from '@mantine/notifications'
import {AlertTriangle} from 'tabler-icons-react'

const Toast = () => {
  return (
    <Group position="center">
      <Button
        variant="outline"
        onClick={() =>
          showNotification({
            title: 'エラーが発生しました',
            message: '時間を置いて再度実行ください',
            autoClose: false,
            icon: <AlertTriangle />,
            // className: 'm-10',
            classNames: {root: 'p-4 w-96', title: 'font-bold', description: 'pt-1 text-black', icon: ''},
          })
        }
      >
        Show notification
      </Button>
    </Group>
  )
}

export default Toast
