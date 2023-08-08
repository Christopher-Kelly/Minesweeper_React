import React, {useRef, useState} from 'react';
import logo from './bomb.svg';
import bomb from './fired.svg';
import flag from './flag.svg';
import './App.css';

//--openssl-legacy-provider
// 1. find a way to link the field printing with the legitimate ones

// shouldn't be an issue, just pass the cell number as a prop to event listener callbacks to update

// 2. add states to represent flags, opened, bomb, not bomb
// 3. populate array  with bombs randomly

function Reset_button() {
    return (
        <button className="reset-button"> Reset </button>
    )
}

function Flag_counter({flag_number}) {
    return (
        <h3 className="flag-counter"> {flag_number} </h3>
    )
}

function Timer() {
    let timerID = useRef(0)
    const [startTime, setstartTime] = useState(null);
    const [currentTime, setcurrentTime] = useState(null);

    function setTime() {
        setstartTime(Date.now())
        setcurrentTime(Date.now());

        setInterval(() => {
                setcurrentTime(Date.now())
            }
            , 10)
    }

    let secondsPassed = 0;
    if (startTime != null && currentTime != null) {
        secondsPassed = (currentTime - startTime) / 1000;
        secondsPassed /= 60
    }

    return (
        <>
            <button className={"minesweeper-button"} onClick={setTime}>
                Start
            </button>
            <div className={"minesweeper-time"}>
                <h3>{secondsPassed.toFixed(2)}</h3>
            </div>
        </>
    );


}

function Title() {
    return (
        <header className="title">
            <div className={"div-title"}>
                <h1>
                    Minesweeper
                </h1>
            </div>
            <div className={"div-logo"}>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        </header>
    )
}

function Flag({value, handleClick}) {
    return (
        <>
            <td>
                <button key={value} className="cell-flag" onClick={handleClick} onContextMenu={handleClick} value={value}>
                    <img src={flag} className={"img-flag"} />
                </button>
            </td>
        </>
    )
}

function Fired({value, handleClick}) {
    return (
        <>
            <td>
                <button key={value} className="cell-fired" onClick={handleClick} onContextMenu={handleClick} value={value}>
                </button>
            </td>
        </>
    )
}

function Bomb({value, handleClick}) {
    return (
        <>
            <td>
                <button key={value} className="cell-bomb" onClick={handleClick} onContextMenu={handleClick} value={value}>
                    <img src={bomb} className={"img-bomb"} />
                </button>
            </td>
        </>
    )
}



//how to handle the conditional rendering problem

//1. array of fired, not fired, flagged
//2. array of values (not bomb, bomb)
function Grid() {
    const [squareValue, setSquareValue] = useState(null);
    const [gridValues, setGridValues] = useState(Array(72).fill(null));

    function random_bombs(){
        let gridBombCopy = Array(72).fill(0);


        let counter;
        //let random_values = Array(10).fill(0);
        for (counter = 0; counter<10;counter++){
            let random_value = Math.floor(Math.random() * 72);
            gridBombCopy[random_value]= 1;
        }
        return gridBombCopy

    }
    const [gridBomb,setGridBomb] = useState(random_bombs());


    function handleClick(e, i) {
        let grid_copy = [...gridValues];
        let value = null;

        if (grid_copy[i] === null) {
            if (e.type == "click") {
                if (gridBomb[i] == 1){
                    value = 3 //bomb
                }
                else{
                    value = 2 //open
                }

            } else if (e.type == "contextmenu") {
                value = 1 //flag
            }

            grid_copy[i] = value;
            setGridValues(grid_copy);
            }
    }


    function Cell({value, handleClick}) {
        if (gridValues[value] === 1) {
            return (
                <>
                    <Flag key={value} value={value} onClick={handleClick}/>
                </>)
        } else {
            if (gridValues[value] === 2) {
                return (
                    <>
                        <Fired key={value} value={value} onClick={handleClick}/>
                    </>)
            } else if (gridValues[value] === 3) {
                return (
                    <>
                        <Bomb key={value} value={value}  onClick={handleClick}/>
                    </>)
            }
            return (
                <>
                    <td>
                        <button className="cell" onClick={handleClick} onContextMenu={handleClick} value={value}/>
                    </td>
                </>
            )
        }
    }


    function Field(props) {
        const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => <Row key={num} number={num}/>)
        return (
            <div className="board">
                {rows}
            </div>
        )
    }

    function Row(props) {
        const cells = [0, 1, 2, 3, 4, 5, 6, 7].map(num => <Cell key={num} value={num + props.number * 8} handleClick={(e)=>handleClick(e,num + props.number * 8)}/>)
        return (
            <div className="row">
                {cells}
            </div>
        )
    }

    return (
        <>
            <div className="grid">
                < Field/>
            </div>

        </>
    )

}

function App() {
    return (
        <div className="App-header">
            <Title/>

            <span className="App-information">
        <Flag_counter flag_number={10}/>
        <Timer/>

      </span>
            <Grid/>

        </div>
    );
}

export default App;
