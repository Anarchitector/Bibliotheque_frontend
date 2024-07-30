import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import { LayoutProps } from "./types"
import { LayoutComponent, Main } from "./styles"

function Layout({ children }: LayoutProps) {
  return (
    <LayoutComponent>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutComponent>
  )
}

export default Layout
