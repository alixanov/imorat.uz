import { Link } from "react-router-dom"
import "./get-started-page.css"

const GetStartedPage = () => {
  return (
    <div className="get__started-page">
      <div className="get__started-title">
        <h1>            Assalomu aleykum Imorat uy oldi-sotdi platformasiga</h1>
        <h2>            Hush kelibsiz !</h2>
        <Link to={"/"}>Kirish</Link>
</div>
    </div>
  )
}

export default GetStartedPage
