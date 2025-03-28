import MuiAvatar from '@mui/material/Avatar';

const Avatar = ({ src, alt, sx }) => {
    return (
        <MuiAvatar
            sx={sx}
            src={src}
            alt={alt}
        />
    );
};

export default Avatar;