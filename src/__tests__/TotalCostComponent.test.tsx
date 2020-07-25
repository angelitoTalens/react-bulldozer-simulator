import React from 'react';
import renderer from 'react-test-renderer';

import TotalCostComponent from '../TotalCostComponent';

test ("Test TotalCostComponent", ()  => {

    const component = renderer.create(
        <TotalCostComponent 
            totalFuel={{quantity:4, value:40}}
            communication={{quantity:4, value:40}}
            unclearedBlock={{quantity:1, value:10}}
            clearProtectedTree={{quantity:0, value:0}}
            paintDamage={{quantity:2, value:20}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

