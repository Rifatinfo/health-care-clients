"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

interface TablePaginationProps {
    currentPage : number;
    totalPages : number;
}

const TablePagination = ({currentPage, totalPages} :  TablePaginationProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const navigationToPage =  (newPage : number)  => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    }

    if(totalPages <= 1){
       return null;
    }
    return (
        <div className="flex item-center  justify-center gap-2">
            <Button
             variant="outline"
             size="sm"
             onClick={() => navigationToPage(currentPage - 1)}
             disabled={currentPage <= 1 || isPending}
            >
                <ChevronLeft className="h-4 w-4 mr-1"/>
                Previous
            </Button>
        </div>
    );
};

export default TablePagination;
