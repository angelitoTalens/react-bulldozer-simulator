import React from "react";
import "./styles/GridComponent.scss"

import BlockComponent from "./BlockComponent"
import { LandType, Position, Direction } from "./EnumTypes"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Col";

type GridComponentProps = {
    grid: LandType[][];
    position: Position;
    direction: Direction;
}

class GridComponent extends React.Component<GridComponentProps> {

    renderBlock(t:LandType, c:boolean, d:Direction, key:string) {
        return (<BlockComponent landType={t} currentPos={c} direction={d} key={key}/>);
    }

    renderGridMap() {
        let gridMap = [];
        let y = 0;
        for (let row of this.props.grid) {
            let rowBlocks = [];
            let x = 0;
            for (const block of row) {
                const isCurrent = ((this.props.position.X === x) && ((this.props.position.Y === y)));
                const key = y + "," + x;
                rowBlocks.push(this.renderBlock(block, isCurrent, this.props.direction, key));
                x++;
            }
            gridMap.push(<Row className="grid-row" key={y}>{rowBlocks}</Row>);
            y++;
        }

        return(
            <div>
                {gridMap}
            </div>
        );
    }
      

    render() {
        return (
            <Container>
                {this.renderGridMap()}
            </Container>
        );
    }
}

export default GridComponent;
