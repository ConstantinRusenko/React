import Card from "../card/Card";
import Button from "../button/Button";
import { useMemo, useState, useCallback } from "react";

const CardListBlock = () => {
    const [items, setNewItem] = useState([]);
    const [doneItems, setDoneItem] = useState([]);

    const handleClick = (() => {
        const newItem = {id: items.length + 1, text: ''};
        setNewItem(prevItems => [...prevItems, newItem]);
    });

    const handleDelete = ({ id, status }) => {
        const a = status ? setDoneItem : setNewItem;
        a(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleDone = useCallback((id) => {
        const doneItem = items.find(item => item.id === id);
        setDoneItem(prevItems => [...prevItems, doneItem]);
        setNewItem(prevItems => prevItems.filter(item => item.id !== id));
    }, [items]);

    const handleUpdateText = ({id, text}) => {
        setNewItem(prevItems => prevItems.map(item => item.id === id ? {...item, text: text} : item));
    }

    const cardListToDo = useMemo(() => {
        return items.map(item => 
            <Card 
                key={item.id} 
                id={item.id} 
                text={item.text} 
                status={false} 
                handleDone={handleDone} 
                handleDelete={handleDelete}
                handleUpdateText={handleUpdateText}/>
        );
    }, [items, handleDone]);

    const cardListDone = useMemo(() => {
        return doneItems.map(item => 
            <Card 
                key={item.id} 
                id={item.id} 
                text={item.text} 
                status={true} 
                handleDelete={handleDelete}/>
        );
    }, [doneItems]);

    return (
        <>
            <header>
                <Button 
                    onClick={handleClick} 
                    className="mb-4">
                    Add ToDo
                </Button>
            </header>
            {cardListToDo}
            <div>-------</div>
            {cardListDone}
        </>
    );
}

export default CardListBlock;