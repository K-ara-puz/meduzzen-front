'use client'
import { Pagination } from 'nextjs-pagination';
import { CustomPaginatorProps } from '../interfaces/CustomPaginatorProps.interface';

export const CustomPaginator = (props: CustomPaginatorProps) => {
  return (
    <Pagination
      onPageChange={props.onClick}
      totalItems={props.totalItems}
      itemsPerPage={props.limit}
    />
  );
};