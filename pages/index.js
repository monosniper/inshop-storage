import {useRouter} from "next/router";
import {useEffect} from "react";
import {$routes} from "../http/routes";

const Home = () => {
    const router = useRouter()
    useEffect(() => {
      router.push($routes.index)
    })
  return null;
}

export default Home