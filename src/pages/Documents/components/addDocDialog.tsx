import { useCallback, useImperativeHandle, useState, forwardRef } from 'react';
import { Dialog, Input, message } from 'tdesign-react';
import { FormItem, FormWrapper } from "../../../components/FormWrapper";
import { addGirl, updateGirl } from '../../../requests';

interface IProps {
  onCompleted?: () => void;
}

export interface IEditorAction {
  show: (info?: any) => void;
  hide: () => void;
}

export default forwardRef<IEditorAction, IProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [girlInfo, setGirlInfo] = useState<any>()

  const show = useCallback((info?: any) => {
    if (info) {
      setGirlInfo(info)
    }
    setVisible(true)
  }, []);

  const hide = useCallback(() => {
    setVisible(false)
    setGirlInfo({})
  }, [])

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }), [hide, show])

  const fromItemLists: FormItem[] = [
    { name: 'name', label: '姓名', children: <Input /> },
    { name: 'age', label: '年龄', children: <Input /> },
    { name: 'skill', label: '技能', children: <Input /> },
  ]

  const submitFun = useCallback(async (form: any) => {
    const values = form.getFieldsValue(['name', 'age', 'skill'])
    if (girlInfo?.id) {
      values.id = girlInfo?.id
    } else {
      delete values?.id
    }
    if (!values?.id) {
      await addGirl(values)
      message.success("添加成功");
    } else {
      await updateGirl(values)
      message.success("修改成功");
    }
    hide();
    props.onCompleted?.();
  }, [hide, props, girlInfo])

  return (
    <>
      <Dialog
        header={girlInfo?.id ? '修改女孩' : '添加女孩'}
        visible={visible}
        onClose={hide}
        destroyOnClose
        footer={false}
        closeOnOverlayClick={false}
      >
        <FormWrapper
          formInitData={girlInfo}
          formItemList={fromItemLists}
          loadingText='提交中'
          prevBtnTo='取消'
          onSubmit={submitFun}
          onCancle={hide}
        />
      </Dialog>
    </>
  )
})
