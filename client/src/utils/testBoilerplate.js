import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// The component you intend to test ( swap App with the component name )
import App from './App';

// initial props and state can vary depending on the default state of your component
const setup = (props = {}, state = null) => {
	return shallow(<App {...props} />);
};

// Utility functions that  make your life easier
// ( change the source location of the file depending on where this test is )
import { findByTestAttributes } from './testUtils';
