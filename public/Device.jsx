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

    return (<Buttons buttons={buttons} onClick={(buttonName) => onButtonClick(deviceName, buttonName)}/>);
}

