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

            <div className="flex items-center gap-1">
              {
                Array.from({length : Math.min(5, totalPages)},
                (_, index) => {
                    let pageNumber;
                    
                    if(totalPages <= 5){
                       pageNumber = index + 1;
                    } else if(currentPage <= 3){
                      pageNumber = index + 1;
                    } else if(currentPage >= totalPages - 2){
                        pageNumber = totalPages - 4 + index;
                    }else {
                        pageNumber = currentPage - 2 + index;
                    }


                    return(
                        <Button
                        key={pageNumber}
                        variant={pageNumber === currentPage ? "default" : "outline"}
                        onClick={() => navigationToPage(pageNumber)}
                        disabled={isPending}
                        className="w-10"
                        >
                            {pageNumber}
                        </Button>
                    )
                }
            
            )
              }
            </div>

            <Button
            variant="outline"
            size="sm"
            onClick={() => navigationToPage(currentPage +1)}
            disabled={currentPage === totalPages || isPending}
            >Next</Button>
        </div>
    );
};

export default TablePagination;
