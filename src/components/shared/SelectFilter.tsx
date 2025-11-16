"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface SelectFilterProps {
    paramName: string;
    placeholder?: string;
    options: { label: string; value: string }[]
}

const SelectFilter = ({ paramName, placeholder, options }: SelectFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition(); SelectFilter
    const currentValue = searchParams.get(paramName) || "All";

    const handlerChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "All") {
            params.delete(paramName);
        } else if (value) {
            params.set(paramName, value);
        } else {
            params.delete(paramName);
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        })
    }
    return (
        <div>
            <Select
                value={currentValue}
                onValueChange={handlerChange}
                disabled={isPending}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectFilter;