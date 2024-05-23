import { Outlet } from "react-router-dom";
import HeaderMain from "../components/HeaderMain"


const IndexPage = () => {

  return(
    <>
      <HeaderMain />
      <Outlet />
    </>
  )

}

export default IndexPage