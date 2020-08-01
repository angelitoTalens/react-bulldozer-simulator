import React from "react";
import "./styles/BlockComponent.scss"
import { LandType } from "./EnumTypes"
import Col from "react-bootstrap/Col";
import { Direction } from "./EnumTypes";

import bulldozer from "./images/bulldozer.gif"


type BlockComponentProps = {
    landType: LandType;
    currentPos: boolean;
    direction: Direction;
}


function BulldozerDirection(direction: Direction) {
    let style = {transform: "rotateY(180deg)"};
    switch(direction) {
        case Direction.Left:
            style = {transform: "none"}
            break;
        case Direction.Up:
            style = {transform: "rotateY(180deg) rotateZ(90deg)"};
            break;
        case Direction.Down:
            style = {transform: "rotateY(180deg) rotateZ(270deg)"};
            break;
        default:
            break; 
    }
    return style;
}

function BlockComponent(props: BlockComponentProps) {
    
    if (props.currentPos) {
        return (
            <Col className="block current-block">
                <img src={bulldozer} alt="bulldozer" style={BulldozerDirection(props.direction)}/>
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
