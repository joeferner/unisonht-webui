function Drawer(props) {
    const {open, onOpen, onClose, currentMode, modes, devices, onDeviceClick, onModeClick} = props;

    return (<MaterialUI.SwipeableDrawer
        anchor='left'
        open={open}
        onClose={onClose}
        onOpen={onOpen}
    >
        <MaterialUI.List subheader={<MaterialUI.ListSubheader>Modes</MaterialUI.ListSubheader>}
                         style={{minWidth: '300px'}}>
            {modes?.map(mode => {
                const isCurrentMode = currentMode === mode.modeName;
                const className = isCurrentMode ? 'current-mode' : '';
                return (<MaterialUI.ListItem
                    button
                    disabled={isCurrentMode}
                    onClick={() => onModeClick(mode)}
                    className={className}
                >
                    <MaterialUI.ListItemText primary={capitalCase(mode.modeName)}/>
                </MaterialUI.ListItem>);
            })}
        </MaterialUI.List>
        <MaterialUI.List subheader={<MaterialUI.ListSubheader>Devices</MaterialUI.ListSubheader>}>
            {devices?.map(device => {
                return (<MaterialUI.ListItem button onClick={() => onDeviceClick(device)}>
                    <MaterialUI.ListItemText primary={capitalCase(device.deviceName)}/>
                </MaterialUI.ListItem>);
            })}
        </MaterialUI.List>
    </MaterialUI.SwipeableDrawer>);
}