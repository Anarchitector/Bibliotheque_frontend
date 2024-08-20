import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { PageComponent } from "./styles";
import LibrariesList from "components/LibrariesList/LibrariesList";

function PageLibrariesList() {
  return (
    <PageComponent>
      <LibrariesList/>
    </PageComponent>
  );
}

export default PageLibrariesList;
