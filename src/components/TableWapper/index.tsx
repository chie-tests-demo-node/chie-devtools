
import { FC, useState } from 'react';
import { Table } from 'tdesign-react';

interface ITableProps {
  coloumWapper: any[],
  dataWapper: any[],
  totalWapper: number,
  styleWapper?: any,
}

export const TableWapper: FC<ITableProps> = ({
  coloumWapper, dataWapper, totalWapper, styleWapper
}) => {
  const [tableLayout, setTableLayout] = useState(false);

  return (
    <Table
      style={styleWapper}
      data={dataWapper}
      columns={coloumWapper}
      rowKey="index"
      verticalAlign="top"
      bordered
      hover
      stripe
      tableLayout={tableLayout ? 'auto' : 'fixed'}
      rowClassName={({ rowIndex }) => `${rowIndex}-class`}
      cellEmptyContent={'-'}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: totalWapper,
        showJumper: true,
        onChange(pageInfo) {
          console.log(pageInfo, 'onChange pageInfo');
        },
        onCurrentChange(current, pageInfo) {
          console.log(current, pageInfo, 'onCurrentChange current');
        },
        onPageSizeChange(size, pageInfo) {
          console.log(size, pageInfo, 'onPageSizeChange size');
        },
      }}
      onPageChange={(pageInfo) => {
        console.log(pageInfo, 'onPageChange');
      }}
      onRowClick={({ row, index, e }) => {
        console.log('onRowClick', { row, index, e });
      }}
    />
  );
}
