"use client";
import { Button } from "@components/ui/Button";

const DeleteFilter = ({
    label,
    onRemove,
}: {
    label?: string;
    onRemove: () => void;
}) => {
    return (
        <Button
            onClick={onRemove}
            variant="danger"
            className="text-xs"
        >
            {label} 
            x
        </Button>
    )
}

export default DeleteFilter
