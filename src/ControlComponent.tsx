import React from "react";
import "./styles/ControlComponent.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faUndoAlt, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


type ControlComponentProps = {
    onClickRotateLeft: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClickRotateRight: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClickAdvance: (event: React.MouseEvent<HTMLButtonElement>) => void,
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

    resetStepSetting() {
        let state = this.state;
        state.stepSetting = 1;
        this.setState(state);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        let state = this.state;
        state.stepSetting = event.target.value ? Number(event.target.value) : NaN;
        this.setState(state);
    }

    render() {
        return (
            <Container className="control-container">
                <Container className="control-button-container">
                    <Row>
                        <Col></Col>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickAdvance}>
                                <FontAwesomeIcon icon={faPlayCircle}/>
                            </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickRotateLeft}>
                                <FontAwesomeIcon icon={faUndoAlt}/>
                            </Button>
                        </Col>
                        <Col></Col>
                        <Col md="auto">
                            <Button variant="success" size="lg" onClick={this.props.onClickRotateRight}>
                                <FontAwesomeIcon icon={faRedoAlt}/>
                            </Button>
                        </Col>
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