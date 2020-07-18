import React from "react";
import "./styles/TotalCostComponent.scss"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Cost } from "./EnumTypes";


type TotalCostComponentProps = {
    totalFuel: Cost;
    communication: Cost;
    unclearedBlock: Cost;
    clearProtectedTree: Cost;
    paintDamage: Cost;
}

function TotalCostComponent(props: TotalCostComponentProps) {

    const totalCost = props.totalFuel.value +
                      props.communication.value +
                      props.unclearedBlock.value +
                      props.clearProtectedTree.value +
                      props.paintDamage.value;

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
                        <td>{props.communication.quantity}</td>
                        <td>{props.communication.value}</td>
                    </tr>
                    <tr>
                        <td>Fuel Usage</td>
                        <td>{props.totalFuel.quantity}</td>
                        <td>{props.totalFuel.value}</td>
                    </tr>
                    <tr>
                        <td>Uncleared Squares</td>
                        <td>{props.unclearedBlock.quantity}</td>
                        <td>{props.unclearedBlock.value}</td>
                    </tr>
                    <tr>
                        <td>Cleared Preserved Tree(s)</td>
                        <td>{props.clearProtectedTree.quantity}</td>
                        <td>{props.clearProtectedTree.value}</td>
                    </tr>
                    <tr>
                        <td>Paint Damage Cost</td>
                        <td>{props.paintDamage.quantity}</td>
                        <td>{props.paintDamage.value}</td>
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