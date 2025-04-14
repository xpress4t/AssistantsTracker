import MuiList from "@mui/material/List";

const List = ({ children, component, dense, disablepadding, sx }) => {
    return (
        <MuiList
        component={component}
        dense={dense}
        disablePadding={disablepadding}
        sx={sx}
        >
        {children}
        </MuiList>
    );
}

export default List;