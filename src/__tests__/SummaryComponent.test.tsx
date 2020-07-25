import React from 'react';
import renderer from 'react-test-renderer';

import SummaryComponent from '../SummaryComponent';
import { LandType, Movements, Commands } from '../EnumTypes';
import { FuelUsageComponentProps } from '../FuelUsageComponent';
import { TotalCostComponentProps } from '../TotalCostComponent';

test ("Test SummaryComponent", ()  => {

    const movementHistory: Movements[] = [
        {command: Commands.Advance, steps: 1},
        {command: Commands.Advance, steps: 1},
        {command: Commands.RotateRight, steps: 0},
        {command: Commands.Advance, steps: 1},
        {command: Commands.RotateRight, steps: 0},
        {command: Commands.Advance, steps: 1},
    ];
    
    const fuelUsageProps: FuelUsageComponentProps = {
        clearPlainLand: {quantity: 1, value: 10},
        clearRockyLand: {quantity: 1, value: 20},
        clearTreePlantedLand: {quantity: 1, value: 20},
        revisitClearedLand: {quantity: 1, value: 10},
    }

    const totalCostProps: TotalCostComponentProps = {
        totalFuel: {quantity:4, value:40},
        communication: {quantity:4, value:40},
        unclearedBlock: {quantity:1, value:10},
        clearProtectedTree: {quantity:0, value:0},
        paintDamage: {quantity:2, value:20}
    }

    const component = renderer.create(
        <SummaryComponent 
            message={"Test Summary"}
            movementHistory={movementHistory}
            fuelUsageProps={fuelUsageProps}
            totalCostProps={totalCostProps}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

