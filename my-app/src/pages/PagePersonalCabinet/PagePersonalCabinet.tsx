import PersonalCabinet from "components/PersonalCabinet/PersonalCabinet"
import { PageComponent } from "./styles"

import { useParams } from "react-router-dom";

function PagePersonalCabinet() {

  const { id } = useParams();

  return (
    <PageComponent>
      <PersonalCabinet />
      {/* Здесь можно добавить логику отображения элементов в зависимости от роли пользователя */}
    </PageComponent>
  )
}

export default PagePersonalCabinet
