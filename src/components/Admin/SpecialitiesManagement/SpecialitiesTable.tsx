"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deteleSpeciality } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { specialtiesColumns } from "./specialitiesColumns";

interface SpecialitiesTableProps {
    specialities: ISpecialty[];
}

const SpecialitiesTable = ({ specialities }: SpecialitiesTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingSpeciality, setDeletingSpeciality] = useState<ISpecialty | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (speciality: ISpecialty) => {
        setDeletingSpeciality(speciality);
    };

    const confirmDelete = async () => {
        if (!deletingSpeciality) return;

        setIsDeletingDialog(true);
        const result = await deteleSpeciality(deletingSpeciality.id);
        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "Speciality deleted successfully");
            setDeletingSpeciality(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete speciality");
        }
    };

    return (
        <div>
            <ManagementTable
                data={specialities}
                columns={specialtiesColumns}
                onDelete={handleDelete}
                getRowKey={(speciality) => speciality.id}
                emptyMessage="No specialities found"
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingSpeciality}
                onOpenChange={(open) => !open && setDeletingSpeciality(null)}
                onConfirm={confirmDelete}
                title="Delete Speciality"
                description={`Are you sure you want to delete ${deletingSpeciality?.title}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </div>
    );
};

export default SpecialitiesTable;