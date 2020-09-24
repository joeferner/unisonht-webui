function Modes() {
    const [modes, setModes] = React.useState(undefined);
    const [currentMode, setCurrentMode] = React.useState(undefined);

    React.useEffect(() => {
        loadModes();
    }, []);

    async function loadModes() {
        const response = await axios.get('/mode');
        setModes(response.data.modes);
        setCurrentMode(response.data.currentMode);
    }

    async function handleModeChange(mode) {
        console.log('change mode', mode);
        await axios.post(`/mode/${mode.modeName}`);
        await loadModes();
    }

    if (!modes) {
        return (<div>Loading...</div>);
    }

    return (<ul className="modes">
        {modes.map(mode => {
            return (<li key={mode.modeName}>
                <Mode mode={mode} isCurrentMode={mode.modeName === currentMode}
                      onModeChange={() => handleModeChange(mode)}/>
            </li>);
        })}
    </ul>);
}

function Mode(props) {
    const {mode, isCurrentMode, onModeChange} = props;
    const [loading, setLoading] = React.useState(false);

    async function handleModeClick(mode) {
        setLoading(true);
        await onModeChange(mode);
        setLoading(false);
    }

    return (<button className={"btn " + (isCurrentMode ? "btn-success" : "btn-secondary")}
                    disabled={isCurrentMode || loading}
                    onClick={() => handleModeClick(mode)}>{mode.modeName} {loading ? 'Loading...' : null}</button>);
}