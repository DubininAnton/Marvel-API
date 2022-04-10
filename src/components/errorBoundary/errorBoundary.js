import { Component } from "react";
import ErrorText from "../errorText/ErrorText";

class ErrorBoundary extends Component {
    state ={ 
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render () {
        if (this.state.error) {
            return (
                <ErrorText/>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;