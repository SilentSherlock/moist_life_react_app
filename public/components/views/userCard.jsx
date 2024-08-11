import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export default function UserCard({imageUrl, avatarName, username, phone, onClickLogin, onClickManage}) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={imageUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {avatarName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                    {phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClickLogin}>登录</Button>
                <Button size="small" onClick={onClickManage}>管理</Button>
            </CardActions>
        </Card>
    );
}