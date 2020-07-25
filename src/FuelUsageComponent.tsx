import React from "react";
import "./styles/FuelUsageComponent.scss"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Cost } from "./EnumTypes";


export type FuelUsageComponentProps = {
     clearPlainLand: Cost;
     clearRockyLand: Cost;
     clearTreePlantedLand: Cost;
     revisitClearedLand: Cost;
}

function FuelUsageComponent(props: FuelUsageComponentProps) {
    const totalVisit = props.clearPlainLand.quantity +
                       props.clearRockyLand.quantity +
                       props.clearTreePlantedLand.quantity +
                       props.revisitClearedLand.quantity;
    
    const totalFuelUsage = props.clearPlainLand.value +
                           props.clearRockyLand.value +
                           props.clearTreePlantedLand.value +
                           props.revisitClearedLand.value;
    
    return (
        <Container className="fuel-usage-container">
            <Table size="sm" striped hover>
                <thead>
                    <tr>
                        <th style={{width: "40%"}}>Activity</th>
                        <th style={{width: "30%"}}>Visits</th>
                        <th style={{width: "30%"}}>Fuel Usage (fuel units)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Clearing Plain Land</td>
                        <td>{props.clearPlainLand.quantity}</td>
                        <td>{props.clearPlainLand.value}</td>
                    </tr>
                    <tr>
                        <td>Clearing Rocky Land</td>
                        <td>{props.clearRockyLand.quantity}</td>
                        <td>{props.clearRockyLand.value}</td>
                    </tr>
                    <tr>
                        <td>Clearing Tree Planted Land</td>
                        <td>{props.clearTreePlantedLand.quantity}</td>
                        <td>{props.clearTreePlantedLand.value}</td>
                    </tr>
                    <tr>
                        <td>Revisiting Cleared Land</td>
                        <td>{props.revisitClearedLand.quantity}</td>
                        <td>{props.revisitClearedLand.value}</td>
                    </tr>
                    <tr>
                        <td><b>Total</b></td>
                        <td><b>{totalVisit}</b></td>
                        <td><b>{totalFuelUsage}</b></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default FuelUsageComponent;