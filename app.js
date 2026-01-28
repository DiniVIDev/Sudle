function App() {
    const [page, setPage] = React.useState("Four");

    return (
        <div>
            <button onClick={() => setPage("Four")}>4x4</button>
            <button onClick={() => setPage("Nine")}>9x9</button>

            {page === "Nine" ? (
                <div className="appContainer">
                    <Nine />
                </div>
            ) : (
                <div className="appContainer">
                    <Four />
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
