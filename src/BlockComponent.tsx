import React from "react";
import "./styles/BlockComponent.scss"
import { LandType } from "./EnumTypes"
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faArrowAltCircleLeft, IconDefinition, faArrowAltCircleUp, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Direction } from "./EnumTypes";


type BlockComponentProps = {
    landType: LandType;
    currentPos: boolean;
    direction: Direction;
}

function BlockComponent(props: BlockComponentProps) {
    if (props.currentPos) {

        let directionIcon: IconDefinition = faArrowAltCircleRight;
        switch(props.direction) {
            case Direction.Left:
                directionIcon = faArrowAltCircleLeft;
                break;
            case Direction.Up:
                directionIcon = faArrowAltCircleUp;
                break;
            case Direction.Down:
                directionIcon = faArrowAltCircleDown;
                break;
            default:
                directionIcon = faArrowAltCircleRight;
                break; 
        }

        return (
            <Col className="block">
                <FontAwesomeIcon icon={directionIcon}/>
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
