function App() {
    return (<React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">UnisonHT</a>
        </nav>

        <div className="content">
            <h6>Modes</h6>
            <Modes/>

            <h6>Devices</h6>
            <Devices/>
        </div>
    </React.Fragment>);
}
