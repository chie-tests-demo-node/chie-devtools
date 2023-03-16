import { useCallback, useImperativeHandle, useState, forwardRef } from 'react'
import { Dialog, Input, message } from 'tdesign-react'
import { FormItem, FormWrapper } from "../../../components/FormWrapper";
import { addGirl } from '../../../requests';


export default forwardRef((props, ref) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  useCallback(() => { }, [])

  useImperativeHandle(ref, () => ({
    show: () => { setVisible(true) },
    hide: () => { setVisible(false) },
    finallyFun: () => { }
  }))

  const fromItemLists: FormItem[] = [
    { name: 'name', label: '姓名', children: <Input /> },
    { name: 'age', label: '年龄', children: <Input /> },
    { name: 'skill', label: '技能', children: <Input /> },
  ]

  return (
    <>
      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        destroyOnClose
        footer={false}
        closeOnOverlayClick={false}
      >
        <FormWrapper
          formItemList={fromItemLists}
          loadingText='加载中'
          onSubmit={async (form, ctx) => {
            const values = form.getFieldsValue(['name', 'age', 'skill'])
            await addGirl(values)
            message.success("添加成功")
            setVisible(false)
          }}
        />
      </Dialog>
    </>
  )
})
