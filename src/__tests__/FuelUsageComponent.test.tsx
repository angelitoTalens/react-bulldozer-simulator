import React from 'react';
import renderer from 'react-test-renderer';

import FuelUsageComponent from '../FuelUsageComponent';

test ("Test FileInputComponent", ()  => {
    const component = renderer.create(
        <FuelUsageComponent
            clearPlainLand={{quantity: 1, value: 10}}
            clearRockyLand={{quantity: 1, value: 20}}
            clearTreePlantedLand={{quantity: 1, value: 20}}
            revisitClearedLand={{quantity: 1, value: 10}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});