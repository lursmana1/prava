"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TicketsPaginationProps = {
  page: number;
  size: number;
  total: number;
};

export default function TicketsPagination({
  page,
  size,
  total,
}: TicketsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = (nextPage: number, nextSize: number) => {
    const sp = new URLSearchParams(searchParams.toString());

    sp.set("page", String(nextPage));
    sp.set("size", String(nextSize));

    // keep subjects if present
    // (no changes needed; URLSearchParams already contains it)

    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <Pagination
      current={page}
      pageSize={size}
      total={total}
      showSizeChanger
      pageSizeOptions={[10, 20, 40]}
      onChange={(p, s) => setParams(p, s)}
      onShowSizeChange={(p, s) => setParams(1, s)} // reset to page 1 on size change
      showTotal={(t, range) => `${range[0]}-${range[1]} / ${t}`}
    />
  );
}
