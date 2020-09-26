function App() {
    const [devices, setDevices] = React.useState(undefined);
    const [modes, setModes] = React.useState(undefined);
    const [currentMode, setCurrentMode] = React.useState(undefined);
    const [currentModeInfo, setCurrentModeInfo] = React.useState(undefined);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const history = ReactRouterDOM.useHistory();

    React.useEffect(() => {
        const loadDevices = async () => {
            try {
                const response = await axios.get('/device');
                setDevices(response.data.devices);
            } catch (err) {
                errors.push(err);
            }
        };
        loadDevices();
    }, []);

    React.useEffect(() => {
        loadModes();
    }, []);

    React.useEffect(() => {
        async function loadCurrentModeInfo() {
            try {
                setCurrentModeInfo(undefined);
                if (currentMode) {
                    const modeInfoResponse = await axios.get(`/mode/${encodeURIComponent(currentMode)}`);
                    setCurrentModeInfo(modeInfoResponse.data);
                }
            } catch (err) {
                errors.push(err);
            }
        }

        loadCurrentModeInfo();
    }, [currentMode])

    async function loadModes() {
        try {
            const response = await axios.get('/mode');
            setModes(response.data.modes);
            setCurrentMode(response.data.currentMode);
        } catch (err) {
            errors.push(err);
        }
    }

    async function handleModeChange(mode) {
        console.log('change mode', mode);
        setLoading(true);
        try {
            await axios.post(`/mode/${mode.modeName}`);
            await loadModes();
        } catch (err) {
            errors.push(err);
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
        } catch (err) {
            errors.push(err);
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
        } catch (err) {
            errors.push(err);
        } finally {
            await sleep(500);
            setLoading(false);
        }
    }

    function handleError(err) {
        errors.push(err);
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
        <MaterialUI.Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            open={errors.length > 0}
            message={errors?.[0]?.message}
            className="errors"
            action={(<MaterialUI.IconButton
                onClick={() => setErrors([])}
                edge="start"
                color="inherit"
                style={{marginRight: '5px'}}>
                <i className="fas fa-times"/>
            </MaterialUI.IconButton>)}
        />

        <div className="content">
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route path="/device/:deviceName">
                    <AppDevice onError={handleError} onButtonClick={handleDeviceButtonClick}/>
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