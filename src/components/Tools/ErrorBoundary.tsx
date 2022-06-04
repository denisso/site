import React from "react";

export class ErrorBoundary extends React.Component<any, any> {

    state: {
        name: string;
        errorInfo: any;
        error: any;
    };
    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            error: null,
            errorInfo: null,
        };
    }
    componentDidCatch(error: any, errorInfo: any) {
        // Catch errors in any components below and re-render with error message
        this.setState({ error: error, errorInfo: errorInfo }); // You can also log error messages to an error reporting service here
    }
    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h3>
                        Problem: {"{"} Component "{this.props.name}" temporary unavailable. {"}"}
                    </h3>
                </div>
            );
        } // Normally, just render children
        return this.props.children;
    }
}
