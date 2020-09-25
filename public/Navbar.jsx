function Navbar(props) {
    const {onMenuClick, loading, currentMode} = props;
    const [subTitle, setSubtitle] = React.useState('');
    const location = ReactRouterDOM.useLocation();

    React.useEffect(() => {
        let subTitle = '';
        if (location.pathname.startsWith('/device/')) {
            subTitle = location.pathname.substr('/device/'.length);
        }
        setSubtitle(subTitle.length > 0 ? `: ${subTitle}` : '');
    }, [location]);

    return (<div className="navbar">
        <MaterialUI.AppBar position="static">
            <MaterialUI.Toolbar>
                <MaterialUI.IconButton onClick={onMenuClick} edge="start" color="inherit" style={{marginRight: '5px'}}>
                    <i className="fas fa-bars"/>
                </MaterialUI.IconButton>
                <MaterialUI.Typography variant="h6" className="title">
                    <MaterialUI.Link href="#" color="inherit" underline="none">UnisonHT</MaterialUI.Link>{subTitle}
                </MaterialUI.Typography>
                <MaterialUI.Typography variant="h6" className="current-mode">
                    {capitalCase(currentMode)}
                </MaterialUI.Typography>
            </MaterialUI.Toolbar>
        </MaterialUI.AppBar>
        <div className={'loading' + (loading ? ' show' : ' hide')}>
            <MaterialUI.LinearProgress color="secondary"/>
        </div>
    </div>);
}
