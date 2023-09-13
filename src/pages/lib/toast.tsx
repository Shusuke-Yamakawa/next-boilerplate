import {Group, Button, TextInput} from '@mantine/core'
import {modals} from '@mantine/modals'
import {notifications} from '@mantine/notifications'
import {AlertTriangle} from 'tabler-icons-react'

const Toast = () => {
  return (
    <Group position="center">
      <Button
        variant="outline"
        onClick={() =>
          notifications.show({
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
      <Button
        variant="outline"
        onClick={() =>
          modals.open({
            title: 'Subscribe to newsletter',
            children: (
              <>
                <TextInput label="Your email" placeholder="Your email" data-autofocus />
                <Button fullWidth onClick={() => modals.closeAll} mt="md">
                  Submit
                </Button>
              </>
            ),
            classNames: {content: 'w-50'},
          })
        }
      >
        Show modal
      </Button>
    </Group>
  )
}

export default Toast
