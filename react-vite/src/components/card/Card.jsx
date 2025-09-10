import { useCallback, useMemo, useState } from "react";
import Button from "../button/Button";

const Card = (props) => {
    const { handleDelete,
            handleDone,
            handleUpdateText,
            text,
            status,
            id } = props;

    const [isEditable, setIsEditable] = useState(false);

    const handleInput = useCallback((e) => {
        handleUpdateText({id: id, text: e.target.value});
    }, [handleUpdateText, id]);

    const handleDeleteCard = () => {
        handleDelete({id: id, status: status});
    }

    const handleDoneCard = () => {
        handleDone(id);
    }

    const manageButtonText = useMemo(() => {
        if (status) return null;
        return (
            <Button onClick={() => setIsEditable(!isEditable)} disabled={status} className="ml-4">
                {isEditable ? 'Save' : 'Edit'}
            </Button>
        );

    }, [isEditable, status]);

    const cardTextBlock = useMemo(() => (
        isEditable ? <input type="text" onInput={handleInput} value={text} /> : <p className="mt-4">{text}</p>
    ), [isEditable, text, handleInput]);

    return (
        <div className="card flex">
            <input type="checkbox" checked={status} onChange={handleDoneCard} disabled={status} />
            {cardTextBlock}
            {manageButtonText}
            {!isEditable && <Button onClick={handleDeleteCard} className="ml-4">Delete</Button>}
        </div>
    );
}

export default Card;
