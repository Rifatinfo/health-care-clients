
interface DeleteConfirmationDialogProps {
    open : boolean;
    onOpenChange : (open : boolean) => void;
    onConfirm : () => void;
    title? : string;
    description? : string;
    itemName? : string;
    isDeleting? : boolean;
}

const DeleteConfirmationDialog = ({open, onOpenChange, onConfirm, title, description, itemName, isDeleting} : DeleteConfirmationDialogProps) => {
    return (
        <div>
            
        </div>
    );
};

export default DeleteConfirmationDialog;