import React from "react";
import "./styles/Simulator.scss"

import { Direction, LandType, Position, SimulationStatus, TabKeys, Commands, Movements } from "./EnumTypes"
import GridComponent from "./GridComponent"
import NavBarComponent from "./NavBarComponent"
import ControlComponent from "./ControlComponent"
import FileInputComponent from "./FileInputComponent"
import SummaryComponent from "./SummaryComponent"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"


type SimulatorProps = {}

type SimulatorState = {
    position: Position;
    gridMap: LandType[][];
    initialGridMap: LandType[][];
    status: SimulationStatus;
    movementHistory: Movements[];
    landTypeHistory: LandType[];
    paintDamageCount: number;
    stepSetting: number;
    tabKey: TabKeys;
    direction: Direction;
}

class Simulator extends React.Component<SimulatorProps, SimulatorState> {

    state: SimulatorState;
    controlComponentRef: React.RefObject<ControlComponent>;

    constructor(props:SimulatorProps) {
        super(props);
        this.state = this.initState();
        this.controlComponentRef = React.createRef(); 
    }

    initState():SimulatorState {
        let state: SimulatorState = {
            position: {X:-1, Y:0},
            gridMap: [],
            initialGridMap: [],
            status: SimulationStatus.Start,
            movementHistory: [],
            landTypeHistory: [],
            paintDamageCount: 0,
            stepSetting: 1,
            tabKey: TabKeys.Simulation,
            direction: Direction.Right,
        }
        return state;
    }

    copyGridMap(source: LandType[][], destination: LandType[][]) {
        for (let row of source) {
            let r: LandType[] = [];
            for (let block of row) {
                r.push(block);
            }
            destination.push(r);
        }
    }

    handleArrows(direction: Direction) {

        let state = this.state;
        const steps = this.state.stepSetting;


        if ((state.position.X === -1) && (direction !== Direction.Right)) {
            return;
        }

        for (let i = 0; i < steps; i++) {
        
            if ((direction === Direction.Left) && (state.position.X > 0)) {
                state.position.X--;
            }
            else if ((direction === Direction.Right) && (state.position.X < state.gridMap[0].length - 1)) {
                state.position.X++;
            }
            else if ((direction === Direction.Up) && (state.position.Y > 0)) {
                state.position.Y--;
            }
            else if ((direction === Direction.Down) && (state.position.Y < state.gridMap.length - 1)) {
                state.position.Y++;
            }
            else {
                state.status = SimulationStatus.OutOfBounds;
                state.tabKey = TabKeys.Results;
            }

            if (state.status === SimulationStatus.Ongoing) {

                state.landTypeHistory.push(state.gridMap[state.position.Y][state.position.X]);

                if ((state.gridMap[state.position.Y][state.position.X] === LandType.TreePlanted) && (i < steps - 1)) {
                    state.paintDamageCount++;
                }

                if (state.gridMap[state.position.Y][state.position.X] !== LandType.Protected) {
                    state.gridMap[state.position.Y][state.position.X] = LandType.Cleared;
                }
                else {
                    state.status = SimulationStatus.ClearedProtected;
                    state.tabKey = TabKeys.Results;
                    break;
                }
            }
        }

        state.movementHistory.push({
            command: Commands.Advance, 
            steps: steps
        });

        this.setState(state);
    }

    handleRotateLeft() {

        if (this.state.position.X === -1) {
            return;
        }

        let state = this.state;
        if (state.direction === Direction.Up) {
            state.direction = Direction.Left;
        }
        else if (state.direction === Direction.Left) {
            state.direction = Direction.Down;
        }
        else if (state.direction === Direction.Down) {
            state.direction = Direction.Right;
        }
        else if (state.direction === Direction.Right) {
            state.direction = Direction.Up;
        }

        state.movementHistory.push({
            command: Commands.RotateLeft, 
            steps: 0
        });

        this.setState(state);
    }

    handleRotateRight() {

        if (this.state.position.X === -1) {
            return;
        }

        let state = this.state;
        if (state.direction === Direction.Up) {
            state.direction = Direction.Right;
        }
        else if (state.direction === Direction.Right) {
            state.direction = Direction.Down;
        }
        else if (state.direction === Direction.Down) {
            state.direction = Direction.Left;
        }
        else if (state.direction === Direction.Left) {
            state.direction = Direction.Up;
        }

        state.movementHistory.push({
            command: Commands.RotateRight, 
            steps: 0
        });

        this.setState(state);
    }

    handleStepSettingChange(event: React.FocusEvent<HTMLInputElement>) {
        let state = this.state;

        if (event.target.value) {
            state.stepSetting = Number(event.target.value);
            this.setState(state);
        }
    }

    handleUserTerminate() {
        let state = this.state;
        state.status = SimulationStatus.UserTerminated;
        state.tabKey = TabKeys.Results;
        this.setState(state);
    }

    handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
        let state = this.initState();
        
        let fileReader = new FileReader();
        fileReader.onloadend = () => {
            
            state.status = SimulationStatus.Ongoing;
            if (fileReader.result) {
                let grid = fileReader.result.toString().split(/\r?\n|\r/);

                for (let rowBlock of grid) {
                    let r:LandType[] = [];
                    for (let landType of rowBlock)
                    {
                        if (landType === "o") {
                            r.push(LandType.Plain);
                        }
                        else if (landType === "r") {
                            r.push(LandType.Rocky);
                        }
                        else if (landType === "t") {
                            r.push(LandType.TreePlanted);
                        }
                        else if (landType === "T"){
                            r.push(LandType.Protected);
                        }
                        else {
                            r = [];
                            break;
                        }
                    }
                    state.gridMap.push(r);
                }
            }

            if ((state.gridMap.length <= 0) || (state.gridMap[0].length <= 0)) {
                state.status = SimulationStatus.NoGrid;
                state.tabKey = TabKeys.Results;
            }

            this.copyGridMap(state.gridMap, state.initialGridMap);

            this.setState(state);
        };
  
        if ((event.target) && (event.target.files)){
          let file = event.target.files[0];
          fileReader.readAsText(file);
        }
    }

    handleTabKey(key: TabKeys) {
        if (this.state.status === SimulationStatus.Ongoing) {
            let state = this.state;
            state.tabKey = key;
            this.setState(state);
        }
    }

    handleRestart() {
        let state = this.initState();

        state.initialGridMap = this.state.initialGridMap;
        this.copyGridMap(this.state.initialGridMap, state.gridMap);
        state.status = SimulationStatus.Ongoing;

        if (this.controlComponentRef.current) {
            this.controlComponentRef.current.resetStepSetting();
        }
        
        this.setState(state);
    }

    renderFileInput() {        
        const show = this.state.status === SimulationStatus.Start;
        return (
            <FileInputComponent
                show={show}
                onFileInput={(event)=> this.handleFileInput(event)}
            />
        );
    }

    renderGrid() {
        return (
            <Container className="grid-container">
                <GridComponent 
                    grid={this.state.gridMap}
                    position={this.state.position}
                    direction={this.state.direction}
                />
            </Container>
        );
    }

    renderControlComponent() {        
        return (
            <ControlComponent
                onClickRotateLeft={()=> this.handleRotateLeft()}
                onClickRotateRight={()=> this.handleRotateRight()}
                onClickAdvance={()=> this.handleArrows(this.state.direction)}
                onUserTerminate={()=> this.handleUserTerminate()}
                onStepSettingChange={(event)=> this.handleStepSettingChange(event)}
                ref={this.controlComponentRef}
            />
        );
    }


    renderSummary(message:string) {
        return (
            <SummaryComponent 
                message={message}
                landTypeHistory={this.state.landTypeHistory}
                movementHistory={this.state.movementHistory}
                gridMap={this.state.gridMap}
                paintDamageCount={this.state.paintDamageCount}
            />
        );
    }

    renderLegend() {
        return(
            <Container className="legend-container">
                <Card style={{ width: '15rem' }}>
                    <Card.Body>
                        <Card.Title>Legend</Card.Title>
                            <div><b>o</b> - Plain Land</div>
                            <div><b>r</b> - Rocky Land</div>
                            <div><b>t</b> - Tree Planted Land</div>
                            <div><b>T</b> - Protected Land</div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    renderNotes() {
        return(
            <Container className="notes-container">
                <Card style={{ width: '15rem' }}>
                    <Card.Body>
                        <Card.Title>Notes</Card.Title>
                            <div>- Only accept <FontAwesomeIcon icon={faPlayCircle}/> as 1st input </div>
                            <div>- Simulation terminates if:</div>
                            <ul>
                                <li>Out of bounds</li>
                                <li><b>T</b> is cleared</li>
                                <li>"End Simulation"</li>
                            </ul>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    renderSimulationArea() {
        return(
            <Container className="simulation-container">
                <Row>
                    <Col sm={1}>
                        start <FontAwesomeIcon icon={faArrowRight}/>
                    </Col>
                    <Col sm={8}>
                        {this.renderGrid()}
                    </Col>
                    <Col sm={3}>
                        {this.renderControlComponent()}
                        {this.renderLegend()}
                        {this.renderNotes()}
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {

        let summaryOutput = this.renderSummary("");
        if (this.state.status === SimulationStatus.Start) {
            return(this.renderFileInput());
        }
        else if (this.state.status === SimulationStatus.NoGrid) {
            summaryOutput = this.renderSummary("Empty Grid from Input File");
        }
        else if (this.state.status === SimulationStatus.ClearedProtected) {
            summaryOutput = this.renderSummary("Simulation Ended, Reserved Tree(s) cleared");
        }
        else if (this.state.status === SimulationStatus.OutOfBounds) {
            summaryOutput = this.renderSummary("Simulation Ended, Moved outside the grid");
        }
        else if (this.state.status === SimulationStatus.UserTerminated) {
            summaryOutput = this.renderSummary("Simulation Terminated by User");
        }

        return (
            <div>
                <NavBarComponent onRestart={()=>this.handleRestart()}/>
                <Tabs activeKey={this.state.tabKey} 
                      onSelect={(key)=> this.handleTabKey(key ? (key as TabKeys) : this.state.tabKey)}
                >
                    <Tab eventKey={TabKeys.Simulation} title="Simulation Area">
                        {this.renderSimulationArea()}
                    </Tab>
                    <Tab eventKey={TabKeys.Results} title="Results" >
                         {summaryOutput}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Simulator;