import { useRef } from "react";
import { Button } from "tdesign-react";
import { TableWapper } from "../../components/TableWapper";
import AddDocDialog from "./components/addDocDialog";


export function Documents() {
  const docRef = useRef<any>()

  return <div className="document-wapper">
    <Button onClick={() => { docRef.current.show() }}>新增</Button>
    <TableWapper />
    <AddDocDialog ref={docRef} />
  </div>;
}
