import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Input, Link, message, Popconfirm, Space } from "tdesign-react";
import FormItem from "tdesign-react/es/form/FormItem";
import { TableWapper } from "../../components/TableWapper";
import { deleteGirl, queryAllGirl } from "../../requests";
import AddDocDialog, { IEditorAction } from "./components/addDocDialog";
import './index.scss';

export function Documents() {
  const docRef = useRef<IEditorAction>(null)
  const [girlInfo, setGirlInfo] = useState<{ girlList: any, total: any }>({ girlList: [], total: 0 })

  const getGirlList = useCallback(async () => {
    const getAllGirl = await queryAllGirl()
    setGirlInfo(getAllGirl)
  }, [])

  useEffect(() => {
    getGirlList()
  }, [getGirlList])

  const coloumWapper = useMemo(() => [
    { title: '姓名', colKey: 'name' },
    { title: '年龄', colKey: 'age' },
    { title: '技能', colKey: 'skill' },
    { title: '创建时间', colKey: 'entryTime', cell: (({ row }: any) => dayjs(row.entryTime).format('YYYY-MM-DD HH:mm:ss')) },
    {
      title: '操作', colKey: 'option', cell: ({ row }: any) => {
        return <Space>
          <Link theme="primary" hover="color" data-id={row.key} onClick={() => {
            docRef.current?.show(row)
          }}>编辑</Link>
          <Popconfirm theme='warning' content='确认删除吗？' onConfirm={async () => {
            await deleteGirl(row?.id)
            message.success('删除成功')
            getGirlList()
          }}><Link theme="primary" hover="color" data-id={row.key} style={{ color: 'red' }}>删除</Link>
          </Popconfirm>
        </Space>
      }
    },
  ], [getGirlList])

  return <div className="documentPage">
    <div className="topSearch">
      <Form layout='inline'>
        <FormItem label='姓名'>
          <Input style={{ width: 244 }} />
        </FormItem>
        <Button onClick={() => { getGirlList() }}>查询</Button>
      </Form>
    </div>
    <div className="document-wapper">
      <Button style={{ marginBottom: 20 }} onClick={() => { docRef.current?.show() }}>新增</Button>
      <TableWapper coloumWapper={coloumWapper} dataWapper={girlInfo?.girlList} totalWapper={girlInfo?.total} />
      <AddDocDialog ref={docRef} onCompleted={() => getGirlList()} />
    </div>
  </div>
}
