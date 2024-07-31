import {FooterComponent, Copyright} from './styles'

function Footer() {
    var year = new Date().getFullYear();

    return (
        <FooterComponent>
            <Copyright>© BiblioHub {year}</Copyright>
        </FooterComponent>
    )
}

export default Footer