import React from 'react';
import renderer from 'react-test-renderer';

import BlockComponent from '../BlockComponent';
import { LandType, Direction } from '../EnumTypes';

test ("Test BlockComponent", ()  => {

    const directions: Direction[] = [Direction.Down, Direction.Left, Direction.Up, Direction.Right] 
    for (let d of directions) {
        const component = renderer.create(
            <BlockComponent landType={LandType.Plain} currentPos={true} direction={d}/>
        );
    
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    }
});