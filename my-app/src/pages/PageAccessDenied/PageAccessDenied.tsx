import { AccessDeniedBox, ErrorBox, LinkComponent } from "./styles";

function PageAccessDenied() {
    return (
        <AccessDeniedBox>
            <ErrorBox>Access denied!</ErrorBox>
            <div>To gain access you need to 
                <LinkComponent to="/api/auth/login"> Login</LinkComponent> or 
                <LinkComponent to="/api/auth/register"> Register</LinkComponent>.
            </div>
        </AccessDeniedBox>
    );
}

export default PageAccessDenied;
