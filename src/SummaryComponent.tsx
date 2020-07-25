import React from "react";
import "./styles/SummaryComponent.scss"

import FuelUsageComponent from "./FuelUsageComponent";
import { LandVisitSummary, LandType, Cost, Movements, Commands } from "./EnumTypes";
import TotalCostComponent from "./TotalCostComponent";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

type SummaryComponentProps = {
    message: string;
    landTypeHistory: LandType[];
    movementHistory: Movements[];
    gridMap: LandType[][];
    paintDamageCount: number;
}

class SummaryComponent extends React.Component<SummaryComponentProps> {

    calculateTotalFuelUnits(summary: LandVisitSummary): number {
        let total = summary.clearPlainLand +
                    summary.revisitClearedLand +
                    summary.clearRockyLand * 2 +
                    summary.clearTreePlantedLand * 2;
        
        return total;
    }

    calculateLandVisits(landTypeHistory: LandType[]): LandVisitSummary {
        let summary: LandVisitSummary = {
            clearPlainLand: 0,
            revisitClearedLand: 0,
            clearRockyLand: 0,
            clearTreePlantedLand: 0,
        };

        for (let landType of landTypeHistory) {
            switch(landType) {
                case LandType.Plain:
                    summary.clearPlainLand++;
                    break;
                case LandType.Cleared:
                    summary.revisitClearedLand++;
                    break;
                case LandType.Rocky:
                    summary.clearRockyLand++;
                    break;
                case LandType.TreePlanted:
                    summary.clearTreePlantedLand++;
                    break;
                default: break;
            }
        }
        return summary;
    }

    calculateUnclearedBlock(grid: LandType[][]): number {
        let total = 0;
        for (let rowBlock of grid) {
            for (let block of rowBlock) {
                switch (block) {
                    case LandType.Plain:
                    case LandType.Rocky:
                    case LandType.TreePlanted:
                        total++;
                        break;
                    default: break;
                }
            }
        }
        return total;
    }

    renderFuelUsage(landTypeHistory: LandType[]) {
        const summary = this.calculateLandVisits(landTypeHistory);

        const clearPlainLandFuelUsage: Cost = {
            quantity: summary.clearPlainLand,
            value: summary.clearPlainLand
        }

        const clearRockyLandFuelUsage: Cost = {
            quantity: summary.clearRockyLand,
            value: summary.clearRockyLand * 2
        }

        const clearTreePlantedLandFuelUsage: Cost = {
            quantity: summary.clearTreePlantedLand,
            value: summary.clearTreePlantedLand * 2
        }

        const revisitClearedLandFuelUsage: Cost = {
            quantity: summary.revisitClearedLand,
            value: summary.revisitClearedLand
        }

        return(
            <FuelUsageComponent
                clearPlainLand={clearPlainLandFuelUsage}
                clearRockyLand={clearRockyLandFuelUsage}
                clearTreePlantedLand={clearTreePlantedLandFuelUsage}
                revisitClearedLand={revisitClearedLandFuelUsage}
            />
        );
    }

    renderTotalCost(
        landTypeHistory: LandType[],
        movementHistory: Movements[],
        gridMap: LandType[][],
        paintDamageCount: number
    ){
        const landVisits = this.calculateLandVisits(landTypeHistory);

        let clearProtectedTreeCount = 0;
        for (let landType of landTypeHistory) {
            if (landType === LandType.Protected) {
                clearProtectedTreeCount++;
            }
        }
      
        const totalFuel: Cost = {
            quantity: this.calculateTotalFuelUnits(landVisits),
            value: this.calculateTotalFuelUnits(landVisits)
        }

        const communication: Cost = {
            quantity: movementHistory.length,
            value: movementHistory.length
        }

        const unclearedBlock: Cost = {
            quantity: this.calculateUnclearedBlock(gridMap),
            value: this.calculateUnclearedBlock(gridMap) * 3
        }

        const clearProtectedTree: Cost = {
            quantity: clearProtectedTreeCount,
            value: clearProtectedTreeCount * 10
        }

        const paintDamage: Cost = {
            quantity: paintDamageCount,
            value: paintDamageCount * 2
        }

        return (
            <TotalCostComponent 
                totalFuel={totalFuel}
                communication={communication}
                unclearedBlock={unclearedBlock}
                clearProtectedTree={clearProtectedTree}
                paintDamage = {paintDamage}
            />
        );
    }

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

    renderSummary(message:string) {
        return (
            <Container className="summary-container">
                <Row> <h3>{message}</h3></Row>
                <Row>{this.renderMovementHistory(this.props.movementHistory)}</Row>
                <Row>{this.renderFuelUsage(this.props.landTypeHistory)}</Row>
                <Row>{this.renderTotalCost(
                        this.props.landTypeHistory,
                        this.props.movementHistory,
                        this.props.gridMap,
                        this.props.paintDamageCount)
                }</Row>
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