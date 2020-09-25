function App() {
    const [devices, setDevices] = React.useState(undefined);
    const [modes, setModes] = React.useState(undefined);
    const [currentMode, setCurrentMode] = React.useState(undefined);
    const [currentModeInfo, setCurrentModeInfo] = React.useState(undefined);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const history = ReactRouterDOM.useHistory();

    React.useEffect(() => {
        const loadDevices = async () => {
            const response = await axios.get('/device');
            setDevices(response.data.devices);
        };
        loadDevices();
    }, []);

    React.useEffect(() => {
        loadModes();
    }, []);

    React.useEffect(() => {
        async function loadCurrentModeInfo() {
            setCurrentModeInfo(undefined);
            if (currentMode) {
                const modeInfoResponse = await axios.get(`/mode/${encodeURIComponent(currentMode)}`);
                setCurrentModeInfo(modeInfoResponse.data);
            }
        }

        loadCurrentModeInfo();
    }, [currentMode])

    async function loadModes() {
        const response = await axios.get('/mode');
        setModes(response.data.modes);
        setCurrentMode(response.data.currentMode);
    }

    async function handleModeChange(mode) {
        console.log('change mode', mode);
        setLoading(true);
        try {
            await axios.post(`/mode/${mode.modeName}`);
            await loadModes();
        } finally {
            await sleep(500);
            setLoading(false);
        }
    }

    function handleDeviceClick(device) {
        setDrawerOpen(false);
        history.push(`/device/${encodeURIComponent(device.deviceName)}`);
    }

    async function handleModeClick(mode) {
        setDrawerOpen(false);
        await handleModeChange(mode);
    }

    async function handleDeviceButtonClick(deviceName, buttonName) {
        console.log('device button click', deviceName, buttonName);
        setLoading(true);
        try {
            await axios.post(`/device/${deviceName}/button/${encodeURIComponent(buttonName)}`);
        } finally {
            await sleep(500);
            setLoading(false);
        }
    }

    async function handleModeButtonClick(modeName, buttonName) {
        console.log('mode button click', modeName, buttonName);
        setLoading(true);
        try {
            await axios.post(`/mode/${modeName}/button/${encodeURIComponent(buttonName)}`);
            await loadModes();
        } finally {
            await sleep(500);
            setLoading(false);
        }
    }

    return (<React.Fragment>
        <Navbar onMenuClick={() => setDrawerOpen(!drawerOpen)} loading={loading} currentMode={currentMode}/>
        <Drawer
            currentMode={currentMode}
            modes={modes}
            devices={devices}
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
            onDeviceClick={handleDeviceClick}
            onModeClick={handleModeClick}
        />
        <div className="content">
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route path="/device/:deviceName">
                    <AppDevice onButtonClick={handleDeviceButtonClick}/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path="/">
                    <Mode mode={currentModeInfo} onButtonClick={handleModeButtonClick}/>
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
        </div>
    </React.Fragment>);
}

function AppDevice(props) {
    const {deviceName} = ReactRouterDOM.useParams();
    return (<Device {...props} deviceName={deviceName}/>);
}

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}