import React from "react";
import "./styles/TotalCostComponent.scss"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";


type TotalCostComponentProps = {
    totalFuelUnits: number;
    communicationCount: number;
    unclearedBlockCount: number;
    clearProtectedTreeCount: number;
    paintDamageCount: number;
}

function TotalCostComponent(props: TotalCostComponentProps) {

    const totalFuelCost = props.totalFuelUnits;
    const communicationCost = props.communicationCount;
    const unclearedBlockCost = props.unclearedBlockCount * 3;
    const clearPreservedTreeCost = props.clearProtectedTreeCount * 10;
    const paintDamageCost = props.paintDamageCount * 2;

    const totalCost = totalFuelCost +
                      communicationCost +
                      unclearedBlockCost +
                      clearPreservedTreeCost +
                      paintDamageCost;

    return (
        <Container className="total-cost-container">
            <Table size="sm" striped hover>
                <thead>
                    <tr>
                        <th style={{width: "40%"}}>Item</th>
                        <th style={{width: "30%"}}>Quantity</th>
                        <th style={{width: "30%"}}>Cost (Credit(s))</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Communication Overhead</td>
                        <td>{props.communicationCount}</td>
                        <td>{communicationCost}</td>
                    </tr>
                    <tr>
                        <td>Fuel Usage</td>
                        <td>{props.totalFuelUnits}</td>
                        <td>{totalFuelCost}</td>
                    </tr>
                    <tr>
                        <td>Uncleared Squares</td>
                        <td>{props.unclearedBlockCount}</td>
                        <td>{unclearedBlockCost}</td>
                    </tr>
                    <tr>
                        <td>Cleared Preserved Tree(s)</td>
                        <td>{props.clearProtectedTreeCount}</td>
                        <td>{clearPreservedTreeCost}</td>
                    </tr>
                    <tr>
                        <td>Paint Damage Cost</td>
                        <td>{props.paintDamageCount}</td>
                        <td>{paintDamageCost}</td>
                    </tr>
                    <tr>
                        <td><b>Total Cost</b></td>
                        <td></td>
                        <td><b>{totalCost}</b></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default TotalCostComponent;