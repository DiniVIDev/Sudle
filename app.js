function App() {
    const content = <Game />;
    return <div className="appContainer">
        {content}
    </div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
