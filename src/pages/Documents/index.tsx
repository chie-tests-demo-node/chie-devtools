import { useCallback, useEffect, useRef } from "react";
import { Button } from "tdesign-react";
import { TableWapper } from "../../components/TableWapper";
import { queryAllGirl } from "../../requests";
import AddDocDialog from "./components/addDocDialog";
import './index.scss';

export function Documents() {
  const docRef = useRef<any>()

  const getGirlList = useCallback(async () => {
    const getAllGirl = await queryAllGirl()
    console.log(getAllGirl)
    return getAllGirl
  }, [])

  useEffect(() => {
    // getGirlList()
  }, [getGirlList])

  const coloumWapper = [
    { title: '姓名' }
  ]

  return <div className="document-wapper">
    <Button style={{ marginBottom: 20 }} onClick={() => { docRef.current.show() }}>新增</Button>
    <TableWapper coloumWapper={coloumWapper} dataWapper={[]} totalWapper={28} />
    <AddDocDialog ref={docRef} />
  </div>;
}
