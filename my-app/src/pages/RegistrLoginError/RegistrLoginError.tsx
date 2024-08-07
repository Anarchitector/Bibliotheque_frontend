import { useLocation } from 'react-router-dom';
import { ErrorContainer, LinkComponent, PageTitle, TypeErrorSpan } from './styles';

function RegistLoginError() {
    const location = useLocation();
    const { error } = location.state || { error: 'Unknown error' };

    return (
        <ErrorContainer>
            <PageTitle>Error page</PageTitle>
            <TypeErrorSpan>{error}</TypeErrorSpan>
            <LinkComponent href="/api/auth/login">Return to the authorization page</LinkComponent>
            <LinkComponent href="/">Return to home page</LinkComponent>
        </ErrorContainer>
    );
}

export default RegistLoginError;
