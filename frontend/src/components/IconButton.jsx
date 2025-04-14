import MuiIconButton from "@mui/material/IconButton";

const IconButton = ({ children, color, disabled, edge, size, sx }) => {
    return (
        <MuiIconButton
            color={color}
            disabled={disabled}
            edge={edge}
            size={size}
            sx={sx}
        >
            {children}
        </MuiIconButton>
    );
}

export default IconButton;  