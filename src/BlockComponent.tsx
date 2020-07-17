import React from "react";
import "./styles/BlockComponent.scss"
import { LandType } from "./EnumTypes"
import bulldozer from "./images/bulldozer.gif"
import Col from "react-bootstrap/Col";


type BlockComponentProps = {
    landType: LandType;
    currentPos: boolean;
}

function BlockComponent(props: BlockComponentProps) {
    if (props.currentPos) {
        return (
            <Col className="block">
                <img src={bulldozer} alt="bulldozer" />
            </Col>
        );
    }
    else {
        return (
            <Col className="block">
                {props.landType}
            </Col>
        );
    }
}

export default BlockComponent;
