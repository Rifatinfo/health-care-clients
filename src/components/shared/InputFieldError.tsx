import { getInputFieldError, IIputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
    field : string;
    state : IIputErrorState
}

const InputFieldError = ({field, state} : InputFieldErrorProps) => {
    if(getInputFieldError(field, state)){
        return (
            <FieldDescription>
                {getInputFieldError(field, state)}
            </FieldDescription>
        )
    }

    return null;
}

export default InputFieldError;