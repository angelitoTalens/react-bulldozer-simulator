import React from 'react';
import renderer from 'react-test-renderer';

import SummaryComponent from '../SummaryComponent';
import { LandType, Movements, Commands } from '../EnumTypes';

test ("Test SummaryComponent", ()  => {

    const landTypeHistory: LandType[] = [
        LandType.Plain,
        LandType.Rocky,
        LandType.TreePlanted,
        LandType.Plain
    ];

    const movementHistory: Movements[] = [
        {command: Commands.Advance, steps: 1},
        {command: Commands.Advance, steps: 1},
        {command: Commands.RotateRight, steps: 0},
        {command: Commands.Advance, steps: 1},
        {command: Commands.RotateRight, steps: 0},
        {command: Commands.Advance, steps: 1},
    ];
    
    const gridMap: LandType[][] = [
        [LandType.Plain, LandType.Rocky],
        [LandType.TreePlanted, LandType.Plain],
    ];  

    const component = renderer.create(
        <SummaryComponent 
            message={"Test Summary"}
            landTypeHistory={landTypeHistory}
            movementHistory={movementHistory}
            gridMap={gridMap}
            paintDamageCount={0}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

