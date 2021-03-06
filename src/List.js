import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const List = () => {
    const [toDoList, setToDoList] = React.useState([]);
    let tempToDoList = "",
        tempHours = "",
        tempMinutes = "";

    const handleChange = (event) => {
        switch(event.target.name) {
            case "toDo":
                tempToDoList = event.target.value;
                break;
            case "hours":
                tempHours = event.target.value;
                break;
            case "minutes":
                tempMinutes = event.target.value;
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setToDoList([...toDoList, {item: tempToDoList, hours: tempHours, minutes: tempMinutes}]);
        document.querySelector("#toDoForm").reset();
    }

    const FullList = () => {
        const handleDelete = (index) => {
            let newList = [...toDoList];
            newList.splice(index, 1);
            setToDoList(newList);
        };

        const handleBegin = (index) => {
            let newList = [...toDoList];
            newList[index].startTime = new Date();
            setToDoList(newList);
            console.log(newList[index].startTime);
        };

        const handleStop = (index) => {
            let newList = [...toDoList];
            newList[index].endTime = new Date();
            // milliseconds to minutes
            let timeDiff = newList[index].endTime - newList[index].startTime;
            let minutes = Math.floor((timeDiff % 3600000) / 60000);

            // get hours and minutes combined from newList[index].hours and newList[index].minutes
            let totalMinutes = parseInt(newList[index].hours) * 60 + parseInt(newList[index].minutes);

            newList[index].hours = Math.floor((totalMinutes - minutes) / 60);
            newList[index].minutes = (totalMinutes - minutes) % 60;

            // reset
            newList[index].startTime = new Date();
            setToDoList(newList);
        };

        return toDoList.map((item, index) => {
            return ( <h3 key={index}> {item.item}: {item.hours}H:{item.minutes}M <Button variant="success" type="submit" onClick={() => {handleBegin(index)}}>Begin</Button> <Button style={{color: "white"}} variant="warning" type="submit" onClick={() => {handleStop(index)}}>Stop</Button> <Button variant="danger" type="submit" onClick={(event) => {handleDelete(index)}}>Delete</Button> </h3> );
        });
    }

    return (
        <div style={{width: "90%"}}>
            <Form id="toDoForm" onSubmit={handleSubmit} style={{width: "100%"}}>
                <Form.Group controlId="task">
                    <Form.Control style={{width:"40%", display: "inline-block"}} name="toDo" onChange={handleChange} type="text" placeholder="Enter task" />
                    <Form.Select style={{width: "30%", display: "inline-block", marginLeft: 10}} name="hours" onChange={handleChange}>
                        <option>Hours</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                    <Form.Select style={{width: "30%", display: "inline-block", marginLeft: 10}} name="minutes" onChange={handleChange}>
                        <option>Minutes</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                    </Form.Select>
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
