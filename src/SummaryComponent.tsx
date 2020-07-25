import React from "react";
import "./styles/SummaryComponent.scss"

import FuelUsageComponent, { FuelUsageComponentProps } from "./FuelUsageComponent";
import { Movements, Commands } from "./EnumTypes";
import TotalCostComponent, { TotalCostComponentProps } from "./TotalCostComponent";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

type SummaryComponentProps = {
    message: string;
    movementHistory: Movements[];
    fuelUsageProps: FuelUsageComponentProps;
    totalCostProps: TotalCostComponentProps;
}

class SummaryComponent extends React.Component<SummaryComponentProps> {

    renderMovementHistory(movementHistory: Movements[]) {
        let movements: string[] = [];
        for (let move of movementHistory) {
            (move.command === Commands.Advance) ? movements.push(move.command + move.steps + ", ") :
                                                  movements.push(move.command + ", ")
        }
        return (
            <Container>
                <Table size="sm" striped hover>
                    <thead>
                        <tr><th>Movements History</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>{movements}</td></tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
    
    renderFuelUsage(fuelUsageProps: FuelUsageComponentProps) {

        return(
            <FuelUsageComponent
                clearPlainLand={fuelUsageProps.clearPlainLand}
                clearRockyLand={fuelUsageProps.clearRockyLand}
                clearTreePlantedLand={fuelUsageProps.clearTreePlantedLand}
                revisitClearedLand={fuelUsageProps.revisitClearedLand}
            />
        );
    }

    renderTotalCost(totalCostProps: TotalCostComponentProps){

        return (
            <TotalCostComponent 
                totalFuel={totalCostProps.totalFuel}
                communication={totalCostProps.communication}
                unclearedBlock={totalCostProps.unclearedBlock}
                clearProtectedTree={totalCostProps.clearProtectedTree}
                paintDamage = {totalCostProps.paintDamage}
            />
        );
    }

    renderSummary(message:string) {
        return (
            <Container className="summary-container">
                <Row> <h3>{message}</h3></Row>
                <Row>{this.renderMovementHistory(this.props.movementHistory)}</Row>
                <Row>{this.renderFuelUsage(this.props.fuelUsageProps)}</Row>
                <Row>{this.renderTotalCost(this.props.totalCostProps)}</Row>
            </Container>
        );
    }

    render() {
        return (
            <div>
                {this.renderSummary(this.props.message)}
            </div>
        );
    }
}

export default SummaryComponent;