"use client";

import { Pagination } from "antd";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

type BlogPaginationProps = {
  page: number;
  size: number;
  total: number;
};

export default function BlogPagination({
  page,
  size,
  total,
}: BlogPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = (nextPage: number, nextSize: number) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("page", String(nextPage));
    router.push(`${pathname}?${urlParams.toString()}`);
  };

  return (
    <Pagination
      current={page}
      pageSize={size}
      total={total}
      showSizeChanger = {false}
      onChange={(page, size) => setParams(page, size)}
      onShowSizeChange={(_, newSize) => setParams(1, newSize)}
      showTotal={(totalCount, range) => `${range[0]}-${range[1]} / ${totalCount}`}
    />
  );
}
