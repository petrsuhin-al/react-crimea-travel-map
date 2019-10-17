import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        // Обновление состояния, чтобы при последующей отрисовке показать аварийный UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Вы можете прологировать ошибку с помощью сервиса отчета об ошибках
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            // Вы можете отрисовать любой резервный UI
            return <h1>Ну все, ховайся! Возникли ошибки...</h1>;
        }
        return this.props.children;
    }
}