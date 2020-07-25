import React from 'react';
import renderer from 'react-test-renderer';

import ControlComponent from '../ControlComponent';

test ("Test ControlComponent", ()  => {
    const component = renderer.create(
        <ControlComponent
            onClickRotateLeft={()=>{}}
            onClickRotateRight={()=>{}}
            onClickAdvance={()=>{}}
            onUserTerminate={()=>{}}
            onStepSettingChange={()=>{}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});