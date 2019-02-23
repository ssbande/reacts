import * as React from 'react';

interface IProps {
    compiler: string, 
    framework: string, 
    bundler: string
}

export class Hello extends React.Component<IProps, {}> {
    render() {
        const {framework: fx, compiler, bundler} = this.props;
        return <h1>This is a {fx} application using {compiler} with {bundler}</h1>
    }
}