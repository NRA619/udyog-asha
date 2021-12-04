import { parseCookies } from "../components/cookie";
import axios from 'axios';
import { useEffect } from "react";

export default function HomePage({ data }) {
  return (
    <>
      <div className="pt-40">
        <h1>Homepage </h1>
        <p>Data from cookie: {data.user}</p>
      </div>
    </>
  )
}

HomePage.getInitialProps = async ({ res, req }) => {
  const data = parseCookies(req)
if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return {
    data: data,
  }
}
