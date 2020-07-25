import React from 'react';
import renderer from 'react-test-renderer';

import NavBarComponent from '../NavBarComponent';

test ("Test NavBarComponent", ()  => {

    const component = renderer.create(
        <NavBarComponent
            onRestart={()=>{}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});