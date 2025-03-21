'use client';
import type { PaginationProps, TableProps } from 'antd';
import { Empty, Table } from 'antd';
import type { SorterResult } from 'antd/lib/table/interface';
import type { HTMLAttributes, TdHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.scss';

interface ITable {
  setPage: (page: number) => void;
  changeSortColumn: (columnName: any, typeSort: any) => void;
  total?: number;
  pageCurrent: number;
  columns: any;
  data: any;
  rowKey: string;
  pageSize: any;
  onRowClick?: (row: any) => HTMLAttributes<any> | TdHTMLAttributes<any>;
  isPageHide?: Boolean;
  isLoading?: boolean;
  scrollX?: number | string;
  rowClassName?: (record: { id: string }) => string;
  paginationPosition?: 'bottomLeft' | 'bottomRight';
}

interface DataTypeSort {
  columnKey: any;
  order: any;
}

interface Locale {
  emptyText: string | JSX.Element;
}

const TableComponent = ({
  setPage,
  total,
  columns,
  data,
  rowKey,
  pageCurrent,
  changeSortColumn,
  pageSize,
  onRowClick,
  isPageHide,
  isLoading,
  scrollX,
  rowClassName,
  paginationPosition = 'bottomRight',
}: ITable) => {
  const mapTypeSort = (typeSort: any) => {
    switch (typeSort) {
      case 'ascend':
        return 'ASC';
      case 'descend':
        return 'DESC';

      default:
        return '';
    }
  };

  const handleChange: TableProps<any>['onChange'] = (
    _pagination,
    _filters,
    sorter
  ) => {
    const sorterHandle = sorter as SorterResult<DataTypeSort>;
    if (
      sorterHandle?.order !== undefined &&
      sorterHandle?.columnKey !== undefined
    ) {
      changeSortColumn(
        sorterHandle?.columnKey,
        mapTypeSort(sorterHandle?.order)
      );
    } else {
      changeSortColumn('', '');
    }
  };


  const locale: Locale = {
    emptyText: isLoading ? (
      <></>
    ) : (
      <Empty className="my-20" description={'Không có dữ liệu'} />
    ),
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  return (
    <>
      <Table
        tableLayout="auto"
        bordered
        pagination={
          isPageHide
            ? false
            : {
              onChange,
              total,
              current: pageCurrent,
              pageSize,
              showSizeChanger: false,
              position: [paginationPosition],
              size: 'default',
            }
        }
        className={styles.tableCustom}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={rowKey}
        onRow={onRowClick}
        scroll={scrollX ? { x: scrollX } : {}}
        locale={locale}
        loading={isLoading}
        rowClassName={rowClassName}
      />
    </>
  );
};

export default TableComponent;
