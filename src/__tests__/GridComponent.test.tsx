import React from 'react';
import renderer from 'react-test-renderer';

import GridComponent from '../GridComponent';
import { LandType, Direction } from '../EnumTypes';

test ("Test GridComponent", ()  => {

    const grid: LandType[][] = [
        [LandType.Plain, LandType.Rocky, LandType.TreePlanted],
        [LandType.Plain, LandType.Rocky, LandType.Protected],
        [LandType.Plain, LandType.Rocky, LandType.Cleared]
    ];

    const component = renderer.create(

        <GridComponent
            grid={grid}
            position={{X:1, Y:1}}
            direction={Direction.Right}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});