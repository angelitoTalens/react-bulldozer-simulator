import React from "react";
import "./styles/ControlComponent.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


type ControlComponentProps = {
    onClickLeft: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClickRight: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClickUp: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClickDown: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onUserTerminate: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onStepSettingChange: (event: React.FocusEvent<HTMLInputElement>) => void,
}

type ControlComponentState = {
    stepSetting: number;
}

class ControlComponent extends React.Component<ControlComponentProps, ControlComponentState> {

    state:ControlComponentState;

    constructor(props:ControlComponentProps) {
        super(props);
        this.state = {
            stepSetting: 1
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state = this.state;
        state.stepSetting = event.target.value ? Number(event.target.value) : NaN;
        this.setState(state);
    }

    render() {
        return (
            <Container className="control-container">
                <Container className="arrow-button-container">
                    <Row>
                        <Col></Col>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickUp}>
                                <FontAwesomeIcon icon={faArrowUp}/>
                            </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickLeft}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </Button>
                        </Col>
                        <Col></Col>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickRight}>
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickDown}>
                                <FontAwesomeIcon icon={faArrowDown}/>
                            </Button>
                        </Col>
                        <Col></Col> 
                    </Row>
                    <Row>
                        <Container className="step-settings-container">
                            <form>
                                <label htmlFor="step">Step Setting:</label>
                                <input type="number" id="step" name="step" 
                                    min="1"
                                    value={this.state.stepSetting}
                                    onChange={(event)=>this.handleInputChange(event)}
                                    onBlur={this.props.onStepSettingChange}
                                />
                            </form>
                        </Container>
                    </Row>               
                </Container>
                <Container className="user-terminate-container">
                    <Row>
                        <Col md={{ span: 9, offset: 2 }}>
                            <Button variant="danger" onClick={this.props.onUserTerminate}>
                                End Simulation
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container> 
        );
    }
    
}
  
export default ControlComponent;