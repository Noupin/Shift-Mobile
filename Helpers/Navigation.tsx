//Third Party Imports
import * as React from 'react';


const {createRef} = React

export const navigationRef = createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
