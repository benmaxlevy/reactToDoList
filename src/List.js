import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const List = () => {
    const [toDoList, setToDoList] = React.useState([]);
    let tempToDoList = "";
    const handleChange = (event) => {
        tempToDoList = event.target.value;
    }

    const handleSubmit = (event) => {
        setToDoList([...toDoList, {item: tempToDoList}]);
        document.querySelector("#toDoForm").reset();
        event.preventDefault();
    }

    const FullList = () => {
        const handleDelete = (index) => {
            let newList = [...toDoList];
            newList.splice(index, 1);
            setToDoList(newList);
        }
        return toDoList.map((item, index) => {
            return ( <h3 key={index}> {item.item} <Button variant="danger" type="submit" onClick={(event) => {handleDelete(index)}}>Delete</Button> </h3> );
        });
    }

    return (
        <div style={{width: "90%"}}>
            <Form id="toDoForm" onSubmit={handleSubmit} style={{width: "100%"}}>
                <Form.Group controlId="task">
                    <Form.Label>Task</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="Enter task" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <hr/>
            <div style={{marginTop: 15}}>
                <FullList />
            </div>
        </div>
    );
}

export default List;
