import React from "react";
import "./styles/FuelUsageComponent.scss"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";


type FuelUsageComponentProps = {
     clearPlainLand: number;
     clearRockyLand: number;
     clearTreePlantedLand: number;
     revisitClearedLand: number;
}

function FuelUsageComponent(props: FuelUsageComponentProps) {
    const totalVisit = props.clearPlainLand +
                       props.clearRockyLand +
                       props.clearTreePlantedLand +
                       props.revisitClearedLand;

    const clearPlainLandFuelUsage = props.clearPlainLand;
    const clearRockyLandFuelUsage = props.clearRockyLand * 2;
    const clearTreePlantedLandFuelUsage = props.clearTreePlantedLand * 2;
    const revisitClearedLandFuelUsage = props.revisitClearedLand;
    
    const totalFuelUsage = clearPlainLandFuelUsage +
                           clearRockyLandFuelUsage +
                           clearTreePlantedLandFuelUsage +
                           revisitClearedLandFuelUsage;
    
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
                        <td>{props.clearPlainLand}</td>
                        <td>{clearPlainLandFuelUsage}</td>
                    </tr>
                    <tr>
                        <td>Clearing Rocky Land</td>
                        <td>{props.clearRockyLand}</td>
                        <td>{clearRockyLandFuelUsage}</td>
                    </tr>
                    <tr>
                        <td>Clearing Tree Planted Land</td>
                        <td>{props.clearTreePlantedLand}</td>
                        <td>{clearTreePlantedLandFuelUsage}</td>
                    </tr>
                    <tr>
                        <td>Revisiting Cleared Land</td>
                        <td>{props.revisitClearedLand}</td>
                        <td>{revisitClearedLandFuelUsage}</td>
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