function Devices() {
    const [devices, setDevices] = React.useState(undefined);

    React.useEffect(() => {
        const loadDevices = async () => {
            const response = await axios.get('/device');
            setDevices(response.data.devices);
        };
        loadDevices();
    }, []);

    if (!devices) {
        return (<div>Loading...</div>);
    }

    return (<ul className="devices">
        {devices.map(device => {
            return (<li>
                <button className="btn btn-secondary">{device.deviceName}</button>
            </li>)
        })}
    </ul>);
}
