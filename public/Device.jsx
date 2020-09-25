function Device(props) {
    const {deviceName, onButtonClick} = props;
    const [buttons, setButtons] = React.useState(undefined);

    React.useEffect(() => {
        const loadDevice = async () => {
            const response = await axios.get(`/device/${deviceName}`);
            setButtons(response.data.buttons);
        };
        loadDevice();
    }, []);

    return (<div>
        <MaterialUI.Typography variant="h6">Buttons</MaterialUI.Typography>
        <ul className="buttons">
            {Object.keys(buttons || {}).map(buttonName => {
                const button = buttons[buttonName];
                return (<li>
                    <DeviceButton button={button} onClick={() => onButtonClick(deviceName, buttonName)}/>
                </li>);
            })}
        </ul>
    </div>);
}

function DeviceButton(props) {
    const {button, onClick} = props;

    return (<MaterialUI.Button
        variant="contained"
        color="default"
        title={button.description}
        onClick={() => onClick(button.name)}>{button.name}</MaterialUI.Button>);
}
